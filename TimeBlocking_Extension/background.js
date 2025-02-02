/*This is file is kind of like the coordinator of our extension. It will check to see if the user is on the correct browser
 *page. If user activate extension (popup?) and fill questionnaire, would then move to contentScript.js., where the main logic
 * will be located. */
chrome.tabs.onUpdated.addListener((tabID,tab)=>{
    if(tab.url && tab.url.includes("calendar.google.com/calendar"))
    {

    }
})