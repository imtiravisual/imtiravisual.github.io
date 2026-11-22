/* =========================================================
   IMTIRA VISUAL — EDIT YOUR CONTENT HERE
   Only change what is between the quotes. Keep commas.
   Text objects look like { en:"..." }
   (full guide: HOW-TO-EDIT.md)
   ========================================================= */
window.SITE = {

  /* ---- Contact ---- */
  whatsapp:  "8801722246217",                       // country code + number, no + or spaces
  instagram: "https://www.instagram.com/imtu_24/",
  email:     "imteajmiraz@gmail.com",

  /* Contact form: get a free key at https://web3forms.com (enter your email, they send the key).
     Paste it below. While empty, the form opens the visitor's email app instead. */
  formKey: "",

  /* ---- Hero phones (the 3 vertical videos in the first screen) ----
     poster = cover image, src = video file. */
  heroReels: [
    { poster: "hero-1.jpg", preview: "hero-1-preview.mp4", src: "hero-1.mp4", title: { en: "Reel 01" } },
    { poster: "hero-2.jpg", preview: "hero-2-preview.mp4", src: "hero-2.mp4", title: { en: "Reel 02" } },
    { poster: "hero-3.jpg", preview: "hero-3-preview.mp4", src: "hero-3.mp4", title: { en: "Reel 03" } }
  ],

  /* ---- Reels (Selected work) ----
     poster = cover image, src = video file or YouTube/Vimeo link.
     Put video files in reels/ . Leave src:"" to show only the cover.
     Horizontal (16:9) video? add  ratio: "16:9"  to that line (vertical is the default).
     To add a reel: copy one { ... }, line and paste it below. */
  reels: [
    { poster: "reel-1.jpg", src: "reel-1.mp4", ratio: "16:9", title: { en: "Reel 01" } },
    { poster: "reel-2.jpg", src: "reel-2.mp4", ratio: "16:9", title: { en: "Reel 02" } },
    { poster: "reel-3.jpg", src: "reel-3.mp4", ratio: "16:9", title: { en: "Reel 03" } },
    { poster: "reel-4.jpg", src: "reel-4.mp4", ratio: "16:9", title: { en: "Reel 04" } },
    { poster: "reel-5.jpg", src: "reel-5.mp4", ratio: "16:9", title: { en: "Reel 05" } }
  ],

  /* ---- Before / After (same length, same size). poster = frame shown while loading.
     Put files in before-after/ . Horizontal pair? add  ratio: "16:9"  to that item. */
  beforeAfter: [
    { before: "1-before.mp4", after: "1-after.mp4", poster: "1-poster.jpg", title: { en: "Talking-head reel 1" } },
    { before: "2-before.mp4", after: "2-after.mp4", poster: "2-poster.jpg", title: { en: "Talking-head reel 2" } },
    { before: "3-before.mp4", after: "3-after.mp4", poster: "3-poster.jpg", title: { en: "Talking-head reel 3" } }
  ],

  /* ---- Trusted by (logos loop automatically). Add more lines as you get clients. ---- */
  clients: [
    { name: "Progress Point", logo: "progresspoint.png" }
    // { name: "Client name", logo: "client.png" },
  ],

  /* ---- Testimonials (section stays hidden while this list is empty) ----
     Example:
     { quote: { en: "Great work!" }, name: "Client Name", role: "Founder, Brand" }, */
  testimonials: [],

  /* ---- Testimonial screenshots (client chat messages). Put images in testimonials/ and list them here.
     Names are already blurred in the images. Add / remove lines freely. ---- */
  testimonialImages: [
    "t01.png",
    "t02.png",
    "t03.png",
    "t04.png",
    "t05.png",
    "t06.png",
    "t07.png",
    "t08.png",
    "t09.png",
    "t10.png",
    "t11.png",
    "t12.png",
    "t13.png",
    "t14.png",
    "t15.png"
  ]
};
