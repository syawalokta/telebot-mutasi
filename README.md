# Telegram QRIS Mutation Bot (OrderKuota)


A Telegram bot built with Node.js (ES Module) + Telegraf to monitor QRIS balance mutations from OrderKuota (via Oktodev API), automatically notify Telegram channels, and provide transparent balance reporting.

This project is suitable for merchants, resellers, and payment monitoring systems that require real-time mutation tracking.


### Features
- Automatic QRIS mutation check (IN & OUT)
- Real-time notification to Telegram channel
- Mutation deduplication using last_id
- Persistent storage using database.json
- Owner commands for testing and reporting
- Transparent balance recap (incoming, outgoing, net balance)
- Modular architecture (plugin + library)

## #File Structure 

    ├── lib/-
    │   ├── mutasi.js
    │   ├── database.js
    │   ├── channel.js
    ├── plugins/-
    │   ├── auto-mutasi.js
    │   ├── owner-testconn.js
    │   ├── admin-rekapsaldo.js
    ├── .gitignore
    ├── config.js
    ├── database.json
    ├── example.config.js
    ├── index.js
    ├── package-lock.json
    ├── package.json
    └── README.md


## Requirements
- Node.js v18 or higher
- Telegram Bot Token
- OrderKuota / Oktodev API access
- A Telegram Channel (bot must be admin)

## Installation
Clone the repository and install dependencies:
```
git clone https://github.com/syawalokta/bot-mutasi.git
cd bot-mutasi
npm install
```

## Configuration
Step 1: Copy configuration file
The file example.config.js is only a template.
Rename it to config.js:
```
cp example.config.js config.js
```

Step 2: Edit config.js
Fill in your real credentials:
```
export const config = {
  token: "TELEGRAM_BOT_TOKEN",
  botname: "VoltraBotz",

  ownerid: ["6807264289"],
  channel: ["@yourchannel"],

  APIs: {
    oktodev: "https://api.oktodev.me"
  },

  OrderKuota: {
    apikey: "oktodev",
    username: "oktodev",
    api_token: "YOUR_API_TOKEN"
  }
}
```
### Important notes:
The bot must be an admin in the target channel
Do not commit config.js to a public repository

## Running the Bot
```
npm start
```

## How It Works 
Automatic Mutation Flow
1. Bot starts
2. Every 20 seconds:
- Sends a GET request to the OrderKuota mutation endpoint
- Parses mutation data
- Filters new mutations (id > last_id)
- Stores new mutations in database.json
- Sends notifications to Telegram channel

## API Endpoint Used
### Request
```
GET https://api.oktodev.me/orderkuota/mutasiqr
```
### Query Parameters
| Parameter | Description |
| --- | --- |
| Apikey | Oktodev API key |
| Username | OrderKuota username |
| Token | OrderKuota API token |

### Example
```
/orderkuota/mutasiqr?apikey=xxx&username=xxx&token=xxx
```

### Example Response
```
[
  {
    "id": 193332185,
    "status": "IN",
    "kredit": "20.000",
    "debet": "0",
    "keterangan": "NOBU / MU****",
    "tanggal": "09/01/2026 21:24",
    "saldo_akhir": "24.881"
  }
]
```

## Data Storage
*database.json*

Used for:
- Tracking last processed mutation ID
- Preventing duplicate notifications
- Storing mutation history

### Example
```
{
  "last_id": 193332185,
  "data": []
}
```

## Available Commands
- /testconn //Fetches the latest mutation and sends it to the configured channel.
- /rekapsaldo //Displays the total incoming balance (IN).

## Roadmap
- Anti-duplicate hash validation
- Daily automatic recap
- CSV / Excel export
- Web dashboard
- Multi-account QRIS support

## Contributing Guidelines
Contributions are welcome via Pull Requests.

 **How to Contribute**
1. Fork this repository
2. Create a new branch from main
```
git checkout -b feature/your-feature-name
```
3. Make your changes
4. Commit with a clear message
``` 
git commit -m "Add transparent balance recap feature"
```
5. Push to your fork
6. Open a Pull Request

# License
MIT License