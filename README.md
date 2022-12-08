## 🎶 **Stef.fm** 🎶

### _Music streaming service in a desktop environment in the browser_

![Stars](https://badgen.net/github/stars/rymix/steffm)
![License](https://badgen.net/github/license/rymix/steffm)

Stef.fm is an online music streaming platform which I am using as a permanent home for my late friend's amazing house music mix collection. I explain more in my [LinkedIn article](https://www.linkedin.com/pulse/passion-project-digital-preservation-archaeology-steve-arnott/).

The platform is based on DaedalOS, an open source desktop environment in the browser project made by Dustin Brett. Please visit his repo and send him some love. He did some amazing work. And DaedalOS itself uses many open source projects. Too many to list and thank in the detail they deserve. All I can say is thank you all for your skill and generosity.

# See it in Action

🌈 [Stef.fm](https://stef.fm) 🌈

# Try it for Yourself

### Clone repo

- [Git](https://git-scm.com/downloads)

```
git clone https://github.com/rymix/steffm
cd steffm
```

### Yarn

- [Node.js](https://nodejs.org/en/download/) (**v16 LTS**)
- [Yarn](https://classic.yarnpkg.com/en/) (`npm install --global yarn`)

```
yarn
```

##### Development

```
yarn build:fs
yarn dev
```

[http://localhost:3001](http://localhost:300)

##### Production

```
yarn build
yarn start
```

### Docker

- [Docker Desktop](https://www.docker.com/products/docker-desktop)

```
docker build -t steffm .
docker run -dp 3001:3001 --rm --name steffm steffm
```

### DaedalOS - Desktop environment in the browser 👌

Stef.fm is based on Based on Dustin Brett's DaedalOS - a desktop environment in the browser. An amazing recreation of a typical PC desktop experience. It has many features which make this both impressive and pleasurable to use. I won't repeat everything here. Instead, head over to his repo and send him some love.

Dustin live-coded this over a year's worth of live streams. You can check out his channel on [YouTube](https://www.youtube.com/@DustinBrett). He has been really generous with his time, so a massive thank you from me and the wider community. I've learned a lot and I'm forever grateful.

![Stars](https://badgen.net/github/stars/DustinBrett/x)
![License](https://badgen.net/github/license/DustinBrett/x)

[https://github.com/DustinBrett/daedalOS#readme](https://github.com/DustinBrett/daedalOS#readme)
