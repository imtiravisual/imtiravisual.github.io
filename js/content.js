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
    { poster: "assets/hero/hero-1.jpg", preview: "assets/hero/hero-1-preview.mp4", src: "assets/hero/hero-1.mp4", title: { en: "Reel 01" } },
    { poster: "assets/hero/hero-2.jpg", preview: "assets/hero/hero-2-preview.mp4", src: "assets/hero/hero-2.mp4", title: { en: "Reel 02" } },
    { poster: "assets/hero/hero-3.jpg", preview: "assets/hero/hero-3-preview.mp4", src: "assets/hero/hero-3.mp4", title: { en: "Reel 03" } }
  ],

  /* ---- Reels (Selected work) ----
     poster = cover image, src = video file or YouTube/Vimeo link.
     Put video files in assets/reels/ . Leave src:"" to show only the cover.
     Horizontal (16:9) video? add  ratio: "16:9"  to that line (vertical is the default).
     To add a reel: copy one { ... }, line and paste it below. */
  reels: [
    { poster: "assets/reels/reel-1.jpg", src: "assets/reels/reel-1.mp4", ratio: "16:9", title: { en: "Reel 01" } },
    { poster: "assets/reels/reel-2.jpg", src: "assets/reels/reel-2.mp4", ratio: "16:9", title: { en: "Reel 02" } },
    { poster: "assets/reels/reel-3.jpg", src: "assets/reels/reel-3.mp4", ratio: "16:9", title: { en: "Reel 03" } },
    { poster: "assets/reels/reel-4.jpg", src: "assets/reels/reel-4.mp4", ratio: "16:9", title: { en: "Reel 04" } },
    { poster: "assets/reels/reel-5.jpg", src: "assets/reels/reel-5.mp4", ratio: "16:9", title: { en: "Reel 05" } }
  ],

  /* ---- Before / After (same length, same size). poster = frame shown while loading.
     Put files in assets/before-after/ . Horizontal pair? add  ratio: "16:9"  to that item. */
  beforeAfter: [
    { before: "assets/before-after/1-before.mp4", after: "assets/before-after/1-after.mp4", poster: "assets/before-after/1-poster.jpg", title: { en: "Talking-head reel 1" } },
    { before: "assets/before-after/2-before.mp4", after: "assets/before-after/2-after.mp4", poster: "assets/before-after/2-poster.jpg", title: { en: "Talking-head reel 2" } },
    { before: "assets/before-after/3-before.mp4", after: "assets/before-after/3-after.mp4", poster: "assets/before-after/3-poster.jpg", title: { en: "Talking-head reel 3" } }
  ],

  /* ---- Trusted by (logos loop automatically). Add more lines as you get clients. ---- */
  clients: [
    { name: "Progress Point", logo: "assets/clients/progresspoint.png" }
    // { name: "Client name", logo: "assets/clients/client.png" },
  ],

  /* ---- Testimonials (section stays hidden while this list is empty) ----
     Example:
     { quote: { en: "Great work!" }, name: "Client Name", role: "Founder, Brand" }, */
  testimonials: [],

  /* ---- Testimonial screenshots (client chat messages). Put images in assets/testimonials/ and list them here.
     Names are already blurred in the images. Add / remove lines freely. ---- */
  testimonialImages: [
    "assets/testimonials/t01.png",
    "assets/testimonials/t02.png",
    "assets/testimonials/t03.png",
    "assets/testimonials/t04.png",
    "assets/testimonials/t05.png",
    "assets/testimonials/t06.png",
    "assets/testimonials/t07.png",
    "assets/testimonials/t08.png",
    "assets/testimonials/t09.png",
    "assets/testimonials/t10.png",
    "assets/testimonials/t11.png",
    "assets/testimonials/t12.png",
    "assets/testimonials/t13.png",
    "assets/testimonials/t14.png",
    "assets/testimonials/t15.png"
  ]
};
