// Change this component at your convenience:
Vue.component("LswWindowsMainTab", {
  template: $template,
  props: {
    viewer: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      
    };
  },
  methods: {
    getRandomString(len = 10) {
      const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
      let out = "";
      while(out.length < len) {
        out += alphabet[Math.floor(Math.random() * alphabet.length)];
      }
      return out;
    },
    openRest() {
      this.viewer.hide();
      this.$dialogs.open({
        id: "rest-dialog-" + this.getRandomString(),
        title: "Database explorer",
        template: `<lsw-database-explorer />`,
      });
    },
    openFilesystem() {
      this.viewer.hide();
      this.$dialogs.open({
        id: "filesystem-dialog-" + this.getRandomString(),
        title: "Filesystem explorer",
        template: `<lsw-filesystem-explorer />`,
      });
    },
  },
  mounted() {
    
  }
});