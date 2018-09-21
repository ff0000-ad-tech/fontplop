<p align="center">
  <img alt="fontplop logo" src="https://user-images.githubusercontent.com/659829/31784135-7f48b70a-b4b5-11e7-9849-7626098460d0.png" width=200>
</p>

---

[![Backers on Open Collective](https://opencollective.com/fontplop/backers/badge.svg)](#backers) [![Sponsors on Open Collective](https://opencollective.com/fontplop/sponsors/badge.svg)](#sponsors) [![build status](https://img.shields.io/travis/reactjs/redux/master.svg?style=flat-square)](https://travis-ci.org/matthewgonzalez/fontplop)

FontPlop is an OSX/macOS application which takes `ttf` and `otf` files and outputs a webfont: `woff`. It is the simpler FAT-specific version of vanilla [FontPlop](http://www.fontplop.com), which outputs a more robust webfont bundle: `woff2`, `woff`, `ttf`/`otf`, and a `css` sample.

### Demo

Please note this demo represents vanilla FontPlot. The FAT version does not output the generated fonts into a subfolder.

<img src="https://user-images.githubusercontent.com/659829/31313375-6a23f4f2-ab96-11e7-9dfb-3643df84e824.gif" alt="fontplop demo" height=300>

### Installation

Build the app, deployed into an `out/` subfolder that is not part of the git repository (for now) because of file size.

```sh
npm install
npm install electron-builder --save-dev
```

### Deployment

Build the app, deployed into an `out/` subfolder that is not part of the git repository (for now) because of file size.

```sh
npm run make
```

### Testing

Create a dev version of the app which will reflect CSS / HTML changes in real time, but may require additional executions for function changes.

```sh
npm start
```

### Generated CSS (recommended - functionality still exists but has been disabled for this build)

_Stolen directly from the Typekit site 💂💰_

```css
@font-face {
    font-family: "My Font";
    src: url("my-font.woff2") format("woff2"), url("my-font.woff") format("woff"),
        url("my-font.otf") format("opentype");
    font-style: normal;
    font-weight: 400;
}
```

**Why not EOT or SVG?** Well, they're essentially no longer needed and/or dying off. See
[this issue](https://github.com/matthewgonzalez/fontplop/issues/17). If you _really_ need EOT/SVG
fonts, you can download version [1.1.0](https://github.com/matthewgonzalez/fontplop/releases/tag/v1.1.0)
where those formats were last supported.

### Credits

#### Contributors

The FontPlop project originally exists thanks to all the people who contribute.
<a href="graphs/contributors"><img src="https://opencollective.com/fontplop/contributors.svg?width=890&button=false" /></a>

### License

MIT
