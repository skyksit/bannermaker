const root = document.querySelector(":root");
const banner = document.getElementById("banner");
const bannerColor = document.getElementById("banner-color");
const bannerText = document.getElementById("banner-text");
const bannerTextColor = document.getElementById("banner-txt-color");
const bannerBorderColor = document.getElementById("banner-bd-color");
const textShadowColor = document.getElementById("txt-shadow-color");

const downloadBanner = () => {
  html2canvas(banner).then((canvas) => {
    saveAs(canvas.toDataURL(), "banner-maker.png");
  });
};
const saveAs = (uri, filename) => {
  const link = document.createElement("a");
  if (typeof link.download === "string") {
    link.href = uri;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
};

let hueb1 = new Huebee( bannerColor, {
  // options
  customColors: [ '#C25', '#E62', '#EA0', '#ED0', '#6C6', '#19F', '#258', '#333' ],
  notation: 'hex',
});
hueb1.on('change', function(color) {
  root.style.setProperty("--banner-color", color);
});
let hueb2 = new Huebee( bannerTextColor, {
  // options
  customColors: [ '#C25', '#E62', '#EA0', '#ED0', '#6C6', '#19F', '#258', '#333' ],
  notation: 'hex',
});
hueb2.on('change', function(color) {
  root.style.setProperty("--banner-txt-color", color);
});
let hueb3 = new Huebee( bannerBorderColor, {
  // options
  customColors: [ '#C25', '#E62', '#EA0', '#ED0', '#6C6', '#19F', '#258', '#333' ],
  notation: 'hex',
});
hueb3.on('change', function(color) {
  root.style.setProperty("--banner-bd-color", color);
});
let hueb4 = new Huebee( textShadowColor, {
  // options
  customColors: [ '#C25', '#E62', '#EA0', '#ED0', '#6C6', '#19F', '#258', '#333' ],
  notation: 'hex',
});
hueb4.on('change', function(color) {
  root.style.setProperty("--txt-shadow-color", color);
});

const generateRandomHexColor = () =>
  `#${(0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)}`;
  function byteToHex(num) {
    // Turns a number (0-255) into a 2-character hex number (00-ff)
    return ('0'+num.toString(16)).slice(-2);
}
const randomizeColor = () => {
  root.style.setProperty("--banner-color", generateRandomHexColor());
  root.style.setProperty("--banner-txt-color", generateRandomHexColor());
  root.style.setProperty("--banner-bd-color", generateRandomHexColor());
  hueb1.setColor(
    getComputedStyle(document.documentElement).getPropertyValue("--banner-color")
  );
  hueb2.setColor(
    getComputedStyle(document.documentElement).getPropertyValue("--banner-txt-color")
  );
  hueb3.setColor(
    getComputedStyle(document.documentElement).getPropertyValue("--banner-bd-color")
  );
};

hueb4.setColor(
  getComputedStyle(document.documentElement).getPropertyValue("--txt-shadow-color")
);

randomizeColor();

const resizeBannerWidth = ({ value }) => (banner.style.width = value + `px`);
const resizeBannerHeight = ({ value }) => (banner.style.height = value + `px`);
const resizeBannerBorber = ({ value }) =>
root.style.setProperty("--banner-bd-width", `${value}px`);

const getBannerImage = () => {
  const file = document.getElementById("banner-image").files[0];
  const reader = new FileReader();
  const preview = document.getElementById("my-image");

  if (file) {
    reader.readAsDataURL(file);
  }
  
  reader.onloadend = () => {
    banner.style.backgroundImage = `url(${reader.result})`;
    preview.src = reader.result;
    // setBannerImage();
  };
};

document.getElementById("banner-image").addEventListener("change", getBannerImage, true);

const resetBannerImage = () => {
  banner.style.backgroundImage = ``;
  document.getElementById("banner-image").value = '';
  document.getElementById("banner-url").value = '';
  document.getElementById("my-canvas").value = '';
  document.getElementById("my-image").src = '';
};

const getURLImage = (e, h ='center', v ='middle') => {
  const imgurl = document.getElementById("banner-url").value;
  var img = document.getElementById('my-image');
  img.crossOrigin = '';   //CORS
  img.src = imgurl;
  setBannerImage(h, v);
};
const setBannerImage = (h ='center', v ='middle') => {
  var canvas = document.getElementById("my-canvas");
  var ctx = canvas.getContext("2d");
  const canvasw = document.getElementById("bannerwd").value;
  const canvash = document.getElementById("bannerhg").value;
  const sourceImg = document.getElementById("my-image");

  canvas.width = canvasw;
  canvas.height = canvash;
  const hvswitch = (value, wh) => ({
    "left": 0,
    "center": (wh-canvas.width)/2,
    "right": (wh-canvas.width),
    "top":0,
    "middle": (wh-canvas.height)/2,
    "bottom": (wh-canvas.height)
  })[value]

  sourceImg.onload = () => {
    if(h==="full") { 
      ctx.drawImage(sourceImg, 0, 0, canvas.width, canvas.height);
    } else {
      ctx.drawImage(sourceImg, hvswitch(h, sourceImg.width), hvswitch(v, sourceImg.height), canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
    }
    var imgbase64 = canvas.toDataURL();
    banner.style.backgroundImage = `url('${imgbase64}')`;
  }

  if (sourceImg.src && sourceImg) {
    //full image
    if(h==="full") { 
      ctx.drawImage(sourceImg, 0, 0, canvas.width, canvas.height);
    } else {
      ctx.drawImage(sourceImg, hvswitch(h, sourceImg.width), hvswitch(v, sourceImg.height), canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
    }
    var imgbase64 = canvas.toDataURL();
    banner.style.backgroundImage = `url('${imgbase64}')`;
  }

}
document.getElementById("banner-url").addEventListener("blur", getURLImage, true);

const alignImage = ({ classList }, h, v) => {
  document.querySelector(".bgimg.align.selected").classList.toggle("selected");
  setBannerImage(h, v);
  classList.add("selected");
};

const addFont = (url) => {
  const fontlist = document.querySelectorAll("link[rel='stylesheet']");
  var isFont = false;
  fontlist.forEach((value) => {
    if (value.href === url)
      isFont = true;
  });
  if(!isFont) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.getElementsByTagName('head')[0].appendChild(link);
  }
};
const getFontUrl = (font) => ({
  // add fonts to https://fonts.google.com/ website
  "Black And White Picture, sans-serif": "https://fonts.googleapis.com/css2?family=Black+And+White+Picture&display=swap",
  "Fredoka One, cursive": "https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap",
  "Noto Sans KR, sans-serif": "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&display=swap",
  "Single Day, cursive": "https://fonts.googleapis.com/css2?family=Single+Day&display=swap",
  "Zen Dots, cursive": "https://fonts.googleapis.com/css2?family=Zen+Dots&display=swap"
})[font];
const changeFont = ({ value }) => {
  addFont(getFontUrl(value));
  banner.style.fontFamily = value;
};
const changeFontSize = ({ value }) => (bannerText.style.fontSize = value + `px`);
const changeTextShadowX = ({ value }) => root.style.setProperty("--txt-shadow-x", `${value}px`);
const changeTextShadowY = ({ value }) => root.style.setProperty("--txt-shadow-y", `${value}px`);
const changeTextShadowBlur = ({ value }) => root.style.setProperty("--txt-shadow-b", `${value}px`);

const alignText = ({ classList }, h, v) => {
  document.querySelector(".text.align.selected").classList.toggle("selected");
  banner.style.textAlign = h;
  banner.style.alignItems = v;
  bannerText.style.textAlign = h;
  bannerText.style.alignItems = v;
  classList.add("selected");
};
