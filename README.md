# Nino
> :hammer: **Advanced and cute moderation discord bot as an entry of Discord's Hack Week!**

## Checklist
- Commands
  - [] Moderation
    - [x] ban
    - [] kick
    - [] mute
    - [] warn
    - [] pardon
    - [] warnings
    - [] cases
    - [] unmute
    - [] unban
  - [x] Core
    - [x] help
    - [x] invite
    - [x] locale
    - [x] ping
    - [x] shardinfo
    - [x] source
    - [x] statistics
    - [x] uptime
  - [x] Owner
    - [x] blacklist
    - [x] whitelist
    - [x] eval
  - [] Settings
    - [x] punishments
    - [] mutedRole
    - [x] mod-log
    - [x] automod
    - [x] logging
    - [x] prefix

- Core :tada:
  - [x] Commands
  - [x] Listeners
  - [x] Punishments
  - [x] Localization
  - [x] Database
  - [x] Redis
  - [x] Sentry

- Automod
  - [] Dehoisting
  - [] Blacklist
  - [] Mentions
  - [] Invites
  - [] Raid
  - [] Spam

- Logging
  - [] Message Delete
  - [] Message Update
  - [x] Voice Joined
  - [x] Voice Switch
  - [x] Voice Left
  - [x] User Banned
  - [x] User Unbanned

- [] Timeouts Microservice
- [] Frontend
- [] API

## Features
- Auto Moderation: **Prevents raids, spam, ads, and much more!**
- Advanced warning system and automated punishments: **Automically punish who commit offenses!**
- Simplicity: **Simplicity is key to any discord bot, and Nino makes sure of it! All commands are tailored to be simple yet powerful.**
...and much more!

## Support
Need support related to Nino or any microservices under the organization? Join in the **Noelware** Discord server in #support under the **Nino** category:

[![discord embed owo](https://discord.com/api/v8/guilds/824066105102303232/widget.png?style=banner3)](https://discord.gg/ATmjFH9kMH)

## Contributing
View our [contributing guidelines](https://github.com/NinoDiscord/Nino/blob/master/CONTRIBUTING.md) and [code of conduct](https://github.com/NinoDiscord/Nino/blob/master/CODE_OF_CONDUCT.md) before contributing.

## Self-hosting
Before attempting to self-host Nino, we didn't plan for users to be able to self-host their own instance of Nino. Most builds are usually buggy and untested as of late, we do have a "stable" branch but it can be buggy sometimes! If you want to use cutting edge features that are most likely not finished, view the [edge](https://github.com/NinoDiscord/Nino/tree/edge) branch for more details. The "stable" branch is master, so anything that should be stable will be added to the upstream.

We will not provide support on how to self-host Nino, use at your own risk! If you do not want to bother hosting it, you can always invite the [public instance](https://discord.com/oauth2/authorize?client_id=531613242473054229&scope=bot) which will be the same experience if you hosted it or not.

### Prerequisites
Before running your own instance of Nino, you will need the following tools:

- [Node.js](https://nodejs.org) (Latest is always used in development, but LTS is recommended)
- [PostgreSQL](https://postgresql.org) (12 is used in development but anything above 10 should fairly work!)
- [Redis](https://redis.io)

If you're moving from v0 to v1, you will need your MongoDB instance before to port the database!

There is tools that are optional but are mostly recommended in some cases:

- [Sentry](https://sentry.io) - Useful to find out where errors are in a pretty UI
- [Docker](https://docker.com)
- [Git](https://git-scm.com) - Useful for fetching new updates easily.

### Setting up
There are 2 ways to setup Nino: using Docker or just doing shit yourself. For self-hosting, Docker isn't required to be used in any environment, it's just there if you really want to use Docker and in Production, we utilize Kubernetes. ┐\_(ツ)\_┌━☆ﾟ.*･｡ﾟ

### Docker
This step isn't finished due to the rewrite not being stable.

### Normal
This step isn't finished due to the rewrite not being stable.

## Example `config.yml` file
- Replace `<discord token>` with your Discord bot's token
- Replace `<username>` with your PostgreSQL database username
- Replace `<password>` with your PostgreSQL database password
- Replace `<host>` (under `database`) with your PostgreSQL database host, if running locally, just use `localhost` or `database` if on Docker
- Replace `<port>` with your PostgreSQL database port it's running, if running locally, set it to `5432`
- Replace `<host>` (under `redis`) with your Redis connection host, if running locally, just use `localhost` or `redis` if on Docker

```yml
environment: development
token: <discord token>

prefixes:
  - !

database:
  url: postgres://<username>:<password>@<host>:<port>/<database>

redis:
  host: <host>
  port: 6379
```

## Maintainers
* Ice#4710 (DevOps, Developer) ([GitHub](https://github.com/IceeMC))
* Rodentman87#8787 (Frontend Developer) ([GitHub](https://github.com/Rodentman87))
* August#5820 (Project Lead, Developer) ([GitHub](https://github.com/auguwu))

## Hackweek Participants
* Chris ([GitHub](https://github.com/auguwu))
* dondish ([GitHub](https://github.com/dondish))
* Kyle ([GitHub](https://github.com/scrap))
* Wessel ([GitHub](https://github.com/Wessel))
* David ([GitHub](https://github.com/davidjcralph))
