document.getElementById('eventForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const eventDescription = document.getElementById('eventInput').value;
    const priority = document.getElementById('priority').value;

    // Call AI API to parse event description
    const eventData = await parseEventWithAI(eventDescription);

    // Add event to Google Calendar
    await addEventToCalendar(eventData, priority);

    // Display event in the list
    displayEvent(eventData, priority);
});

async function parseEventWithAI(description) {
    // Call your AI API (e.g., OpenAI, Gemini) to parse the description
    // Example: Use OpenAI's GPT API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_OPENAI_API_KEY`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: `Extract event details from: ${description}` }]
        })
    });
    const data = await response.json();
    return parseAIData(data.choices[0].message.content);
}

function parseAIData(text) {
    // Parse AI response into structured data (e.g., title, date, time)
    // Example: Extract title, date, and time using regex or other logic
    return {
        title: "Meeting with John",
        date: "2023-10-15",
        time: "15:00"
    };
}

async function addEventToCalendar(eventData, priority) {
    // Use Google Calendar API to add the event
    const event = {
        summary: eventData.title,
        start: { dateTime: `${eventData.date}T${eventData.time}:00Z` },
        end: { dateTime: `${eventData.date}T${eventData.time}:00Z` },
        description: `Priority: ${priority}`
    };
    await gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event
    });
}

function displayEvent(eventData, priority) {
    const eventList = document.getElementById('eventList');
    const eventItem = document.createElement('div');
    eventItem.className = 'p-2 border-b';
    eventItem.textContent = `${eventData.title} (${priority}) - ${eventData.date} ${eventData.time}`;
    eventList.appendChild(eventItem);
}