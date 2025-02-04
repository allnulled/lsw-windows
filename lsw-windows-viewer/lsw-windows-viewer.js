// Change this component at your convenience:
Vue.component("LswWindowsViewer", {
  template: $template,
  props: {},
  data() {
    return {
      isShowing: false
    };
  },
  methods: {
    hide() {
      this.isShowing = false;
    },
    show() {
      this.isShowing = true;
    },
    toggleState() {
      this.isShowing = !this.isShowing;
      this.$forceUpdate(true);
    },
    selectDialog(id) {
      Iterating_dialogs:
      for(let dialogId in this.$refs.dialogs.opened) {
        if(id === dialogId) {
          continue Iterating_dialogs;
        }
        const dialogData = this.$refs.dialogs.opened[dialogId];
        const currentPriority = parseInt(dialogData.priority);
        this.$refs.dialogs.opened[dialogId].priority = currentPriority - 1;
      }
      this.$refs.dialogs.opened[id].priority = 500;
      this.$refs.dialogs.opened[id].minimized = false;
      this.hide();
    }
  },
  mounted() {
    this.$window.LswWindows = this;
    this.$lsw.windows = this;
  }
});