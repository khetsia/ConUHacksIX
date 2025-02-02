require('dotenv').config()
// Authentificate to Notion
const { Client } = require('@notionhq/client');
const notion = new Client({auth: process.env.NOTION_INTEGRATION_KEY});

(async () => {
    const blockId = '18ddf0b71c5e807a8801f496616a18a7';
    const response = await notion.blocks.update({
      "block_id": blockId,
      "heading_2": {
          "rich_text": [
              {
                  "text": {
                      "content": "Lacinato kale"
                  },
                  "annotations": {
                      "color": "green"
                  }
              }
          ]
      }
  });
    console.log(response);
  })();