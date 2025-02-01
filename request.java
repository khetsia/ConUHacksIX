private static void run() throws IOException {
    // Construct the {@link Calendar.Events.List} request, but don't execute it yet.
    Calendar.Events.List request = client.events().list("primary");

    // Load the sync token stored from the last execution, if any.
    String syncToken = syncSettingsDataStore.get(SYNC_TOKEN_KEY);
    if (syncToken == null) {
        System.out.println("Performing full sync.");

        // Set the filters you want to use during the full sync. Sync tokens aren't compatible with
        // most filters, but you may want to limit your full sync to only a certain date range.
        // In this example we are only syncing events up to a year old.
        Date oneYearAgo = Utils.getRelativeDate(java.util.Calendar.YEAR, -1);
        request.setTimeMin(new DateTime(oneYearAgo, TimeZone.getTimeZone("UTC")));
    } else {
        System.out.println("Performing incremental sync.");
        request.setSyncToken(syncToken);
    }

    // Retrieve the events, one page at a time.
    String pageToken = null;
    Events events = null;
    do {
        request.setPageToken(pageToken);

        try {
            events = request.execute();
        } catch (GoogleJsonResponseException e) {
            if (e.getStatusCode() == 410) {
                // A 410 status code, "Gone", indicates that the sync token is invalid.
                System.out.println("Invalid sync token, clearing event store and re-syncing.");
                syncSettingsDataStore.delete(SYNC_TOKEN_KEY);
                eventDataStore.clear();
                run();
            } else {
                throw e;
            }
        }

        List<Event> items = events.getItems();
        if (items.size() == 0) {
            System.out.println("No new events to sync.");
        } else {
            for (Event event : items) {
                syncEvent(event);
            }
        }

        pageToken = events.getNextPageToken();
    } while (pageToken != null);

    // Store the sync token from the last request to be used during the next execution.
    syncSettingsDataStore.set(SYNC_TOKEN_KEY, events.getNextSyncToken());

    System.out.println("Sync complete.");
}