const root = document.querySelector(":root");
const banner = document.getElementById("banner");
const bannerColor = document.getElementById("banner_color");
const bannerBorderColor = document.getElementById("banner_border_color");
const titleColor = document.getElementById("title_color");
const titleShadowColor = document.getElementById("title_shadow_color");
const paragraphColor = document.getElementById("paragraph_color");
const paragraphShadowColor = document.getElementById("paragraph_shadow_color");

const customColors = [
  "#C25",
  "#E62",
  "#EA0",
  "#ED0",
  "#6C6",
  "#19F",
  "#258",
  "#333",
];

const downloadBanner = () => {
  html2canvas(banner, {
    allowTaint: true,
    useCORS: true,
    scrollX: 0,
    scrollY: -window.scrollY,
    windowWidth: document.documentElement.offsetWidth,
    windowHeight: document.documentElement.offsetHeight,
  }).then((canvas) => {
    saveAs(canvas.toDataURL(), "banner-maker" + Date.now() + ".png");
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

let hueb1 = new Huebee(bannerColor, {
  customColors: customColors,
  notation: "hex",
});
hueb1.on('change', function(color) {
  root.style.setProperty("--banner-color", color);
});
let hueb2 = new Huebee(titleColor, {
  customColors: customColors,
  notation: "hex",
});
hueb2.on('change', function(color) {
  root.style.setProperty("--title-color", color);
});
let hueb3 = new Huebee(bannerBorderColor, {
  customColors: customColors,
  notation: "hex",
});
hueb3.on('change', function(color) {
  root.style.setProperty("--banner-bd-color", color);
});

let hueb4 = new Huebee(titleShadowColor, {
  customColors: customColors,
  notation: "hex",
});
hueb4.on("change", function (color) {
  root.style.setProperty("--title-shadow-color", color);
});
let hueb5 = new Huebee(paragraphColor, {
  customColors: customColors,
  notation: "hex",
});
hueb5.on("change", function (color) {
  $("#paragraph").css("color", color);
});
let hueb6 = new Huebee(paragraphShadowColor, {
  customColors: customColors,
  notation: "hex",
});
hueb6.on("change", function (color) {
  root.style.setProperty("--paragraph-shadow-color", color);
});

const generateRandomHexColor = () =>
  `#${(0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)}`;

const randomizeColor = () => {
  root.style.setProperty("--banner-color", generateRandomHexColor());
  root.style.setProperty("--title-color", generateRandomHexColor());
  root.style.setProperty("--banner-bd-color", generateRandomHexColor());
  $("#paragraph").css("color", generateRandomHexColor());
  hueb1.setColor(
    getComputedStyle(document.documentElement).getPropertyValue("--banner-color")
  );
  hueb2.setColor(
    getComputedStyle(document.documentElement).getPropertyValue("--title-color")
  );
  hueb3.setColor(
    getComputedStyle(document.documentElement).getPropertyValue("--banner-bd-color")
  );
  hueb5.setColor($("#paragraph").css("color"));
};

hueb4.setColor(
  getComputedStyle(document.documentElement).getPropertyValue(
    "--title-shadow-color"
  )
);
hueb6.setColor(
  getComputedStyle(document.documentElement).getPropertyValue(
    "--paragraph-shadow-color"
  )
);

const randomizePicture = () => {
  const unsplashList = localStorage.getItem("unsplashList");

  if (unsplashList === null) {
    $.getJSON("unsplash.json", function (json) {
      localStorage.setItem("unsplashList", JSON.stringify(json));
      setBannerPicture();
    });
  } else {
    setBannerPicture();
  }
};

const setBannerImage = (h = "center", v = "center") => {
  $("#banner").css("background-size", "auto");
  $("#banner").css("background-position", `${h} ${v}`);
};

// const setBannerImage = (h = "center", v = "middle") => {
//   var canvas = document.getElementById("my-canvas");
//   var ctx = canvas.getContext("2d");
//   const canvasw = document.getElementById("banner_width").value;
//   const canvash = document.getElementById("banner_height").value;
//   const sourceImg = document.getElementById("my-image");

//   canvas.width = canvasw;
//   canvas.height = canvash;
//   const hvswitch = (value, wh) =>
//     ({
//       left: 0,
//       center: (wh - canvas.width) / 2,
//       right: wh - canvas.width,
//       top: 0,
//       middle: (wh - canvas.height) / 2,
//       bottom: wh - canvas.height,
//     }[value]);

//   sourceImg.onload = () => {
//     if (h === "full") {
//       ctx.drawImage(sourceImg, 0, 0, canvas.width, canvas.height);
//     } else {
//       ctx.drawImage(
//         sourceImg,
//         hvswitch(h, sourceImg.width),
//         hvswitch(v, sourceImg.height),
//         canvas.width,
//         canvas.height,
//         0,
//         0,
//         canvas.width,
//         canvas.height
//       );
//     }
//     var imgbase64 = canvas.toDataURL();
//     banner.style.backgroundImage = `url('${imgbase64}')`;
//   };

//   if (sourceImg.src && sourceImg) {
//     //full image
//     if (h === "full") {
//       ctx.drawImage(sourceImg, 0, 0, canvas.width, canvas.height);
//     } else {
//       ctx.drawImage(
//         sourceImg,
//         hvswitch(h, sourceImg.width),
//         hvswitch(v, sourceImg.height),
//         canvas.width,
//         canvas.height,
//         0,
//         0,
//         canvas.width,
//         canvas.height
//       );
//     }
//     var imgbase64 = canvas.toDataURL();
//     banner.style.backgroundImage = `url('${imgbase64}')`;
//   }
// };

const setBannerPicture = () => {
  const unsplashList = localStorage.getItem("unsplashList");
  let backgroundPictures = JSON.parse(unsplashList);
  const randomNum = Math.floor(Math.random() * backgroundPictures.length);
  $("#banner_url").val(backgroundPictures[randomNum].url);
  $("#banner").css(
    "background",
    "url(" + backgroundPictures[randomNum].url + ")"
  );
};

const randomize = () => {
  randomizeColor();
  randomizePicture();
};

$("#download").click(function () {
  downloadBanner();
});

$("#random").click(function () {
  randomize();
});

$("#reset").click(function () {
  $("#banner").css("background", "");
  document.getElementById("banner-image").value = "";
  document.getElementById("banner_url").value = "";
  document.getElementById("my-canvas").value = "";
});

$("#banner_border_width").on("input propertychange", function () {
  $("#banner").css("border-width", $(this).val());
});

$("#banner_width").on("input propertychange", function () {
  $("#banner").width($(this).val());
});

$("#banner_height").on("input propertychange", function () {
  $("#banner").height($(this).val());
});

$("#banner_url").on("input propertychange", function () {
  $("#banner").css("background", "url(" + $(this).val() + ")");
});

$("#bgfull").click(function () {
  $("#banner").css("background-size", "100% 100%");
});
$("#bg100").click(function () {
  $("#banner").css("background-size", "cover");
});

const getBannerImage = () => {
  const file = document.getElementById("banner-image").files[0];
  const reader = new FileReader();
  if (file) {
    reader.readAsDataURL(file);
  }
  reader.onloadend = () => {
    banner.style.backgroundImage = `url(${reader.result})`;
  };
};

document
  .getElementById("banner-image")
  .addEventListener("change", getBannerImage, true);

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

$("#title_text").on("input propertychange", function () {
  $("#title").html($(this).val());
});

$("#title_width").on("input propertychange", function () {
  $("#title").width($(this).val());
});

$("#title_font").on("input propertychange", function () {
  addFont(getFontUrl($(this).val()));
  $("#title").css("font-family", $(this).val());
});

$("#title_fontsize").on("change", function () {
  $("#title").css("font-size", `${$(this).val()}px`);
});
$("#shadowx").on("change", function () {
  root.style.setProperty("--title-shadow-x", `${$(this).val()}px`);
});
$("#shadowy").on("change", function () {
  root.style.setProperty("--title-shadow-y", `${$(this).val()}px`);
});
$("#shadowblur").on("change", function () {
  root.style.setProperty("--title-shadow-b", `${$(this).val()}px`);
});

/* paragraph */
$("#paragraph_text").on("input propertychange", function () {
  $("#paragraph").html($(this).val());
});

$("#paragraph_width").on("input propertychange", function () {
  $("#paragraph").width($(this).val());
});

$("#paragraph_font").on("input propertychange", function () {
  addFont(getFontUrl($(this).val()));
  $("#paragraph").css("font-family", $(this).val());
});

$("#paragraph_fontsize").on("change", function () {
  $("#paragraph").css("font-size", `${$(this).val()}px`);
});
$("#paragraph_shadow_x").on("change", function () {
  root.style.setProperty("--paragraph-shadow-x", `${$(this).val()}px`);
});
$("#paragraph_shadow_y").on("change", function () {
  root.style.setProperty("--paragraph-shadow-y", `${$(this).val()}px`);
});
$("#paragraph_shadow_blur").on("change", function () {
  root.style.setProperty("--paragraph-shadow-b", `${$(this).val()}px`);
});

const init = () => {
  localStorage.removeItem("unsplashList");
  $(document).ready(function () {
    $(".dragable").draggabilly({
      containment: "#banner",
    });
  });
  randomize();
};

init();