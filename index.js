const fs = require('fs');
const Jimp = require('jimp');

const compareImages = (src1, src2, resolution) => {
  const getImg1 = new Promise((resolve, reject) => {
    Jimp.read(src1, (err, lenna) => {
      if (err) throw err;
      resolve(
        lenna.normalize().resize(resolution, resolution).greyscale().opaque()
      );
    });
  });

  const getImg2 = new Promise((resolve, reject) => {
    Jimp.read(src2, (err, lenna) => {
      if (err) throw err;
      resolve(
        lenna.normalize().resize(resolution, resolution).greyscale().opaque()
      );
    });
  });

  return Promise.all([getImg1, getImg2])
    .then((values) => {
      const [img1, img2] = values;
      const diff = Jimp.diff(img1, img2, 0.1);

      return diff.percent;
    })
    .catch((reason) => {
      console.log(reason);
    });
};

const getImgAsync = (src, resolution) => {
  return new Promise((resolve, reject) => {
    Jimp.read(src, (err, lenna) => {
      if (err) throw err;
      resolve(
        lenna.normalize().resize(resolution, resolution).greyscale().opaque()
      );
    });
  });
};

const compareImagesAsync = async (src1, src2, resolution) => {
  const img1 = await getImgAsync(src1, resolution);
  const img2 = await getImgAsync(src2, resolution);

  const diff = Jimp.diff(img1, img2, 0.1);

  return diff.percent;
};

compareImagesAsync('./src/img/1.png', './src/img/2.png', 16).then(
  (similarity) => console.log('async ',16, ', jimp: ', similarity)
);

[8, 12, 16, 32, 64, 96, 128, 256].forEach((e) => {
  compareImages('./src/img/1.png', './src/img/2.png', e).then((similarity) =>
    console.log(e, ', jimp: ', similarity)
  );
});

// Jimp.read(
//   Buffer.from(
//     'iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAD1ElEQVR4Xu3cW3IUMQyFYWdnLI2lwcpI1dRMCBky7YtkS0c/TxR0u63j85XzlLfW2q/W2p/W2s/W2u/GHxIggY8E3u5/+3EHAhTKQQKfEngAefwTUKgHCbwAAhTqQQIdQIBCTUigtfb1R6zvQuFHL+pSMoFeINwoJevB0KNAgEJnSiUwCwQopWpSd9hVIECp250Sk1sBAUqJutQb0hoIUOp1SHpiLyBAka5NneG8gQClTpckJ90FBCiS9dEfajcQoOh3SmrCU0CAIlUj3WFOAwGKbrckJosCBCgSddIbIhoQoOh1LPVEUYEAJXWtdDYfHQhQdLqWcpIsQICSsl75N50NCFDydy7VBFmBACVVzfJuNjsQoOTtXoqdqwABSoq65dukGhCg5Otg6B2rAgFK6Nrl2Zw6EKDk6WLInVYBApSQ9Yu/qWpAgBK/k6F2WBUIUELVMO5mqgMBStxuhtgZQP49Bn5Jd4haxtkEQP5/FkCJ09GjOwHI6/iBcrSe5z8OkL4zAEpfTnJPAWTsSIEyllf6pwEyd4RAmcst3VsAWTsyoKzlF/5tgNgcEVBscgy3CkBsjwQotnkeXw0gPkcAFJ9ct68KEN/IgeKbr/vqAHGP+PYBoOzJ2fwrADGP9OWCQNmb9/LXALIc4dQCQJmKbf9LANmf+ecvAuVs/pdfB8hlRFseAMqWmMc/ApDxzDzfAIpnuhNrA2QitA2vAGVDyD2fAEhPSueeAcq57G9fBsjhA+j8PFA6g7J+DCDWifquBxTffJ9WB8jmwI0+BxSjIK+WAchVQrH/HyjO5wMQ54A3LQ8Up6AB4hTsoWWBYhw8QIwDDbIcUIwOAiBGQQZdBiiLBwOQxQCTvA6UyYMCyGRwSV8DyuDBAWQwMJHHgdJ5kADpDEr0MaBcHCxARJs/OBZQvgkMIINNEn8cKF8OGCDijZ8cDyj34AAy2aAir5WHApAiTV8csywUgCw2p9jr5aAApFjDjcYtAwUgRo0puow8FIAUbbbx2LJQAGLclOLLyUEBSPFGO40vAwUgTg1h2VsC6aEAhCbvSCAtFIDsqAffeCSQDgpAKO+JBNJAAciJevDNNDcKQChrhATC3igAiVAP9hD2RgEI5YyYQJgbBSAR68GewtwoAKGMGRI4dqMAJEM92OOxGwUglC9jAttuFIBkrAd73najAISyKSTgdqMARKEezOB2owCEcikmYHajAESxHsxkdqMAhDJVSGD6RgFIhXow4/SNAhDKUzGB7hsFIBXrwczdNwpAKAsJvPjlEgChHiTwN4GnH70AQj1I4DmBDyjvpHwrM11guxcAAAAASUVORK5CYII=',
//     'base64'
//   ),
//   (err, lenna) => {
//     lenna.write('test.png');
//   }
// );
