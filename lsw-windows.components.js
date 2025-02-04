(function(factory) {
  const mod = factory();
  if(typeof window !== 'undefined') {
    window["Lsw_windows_components"] = mod;
  }
  if(typeof global !== 'undefined') {
    global["Lsw_windows_components"] = mod;
  }
  if(typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function() {
// Change this component at your convenience:
Vue.component("LswWindowsViewer", {
  template: `<div class="lsw-windows-viewer">
    <lsw-dialogs></lsw-dialogs>
    <lsw-windows-pivot-button :viewer="this" />
    <template v-if="isShowing">
        <lsw-windows-main-tab :viewer="this" />
    </template>
</div>`,
  props: {},
  data() {
    return {
      isShowing: false
    };
  },
  methods: {
    toggleState() {
      this.isShowing = !this.isShowing;
      this.$forceUpdate(true);
    }
  },
  mounted() {
    this.$window.LswWindows = this;
    this.$lsw.windows = this;
  }
});
// Change this component at your convenience:
Vue.component("LswWindowsPivotButton", {
  template: `<div class="lsw_windows_pivot_button">
    <button v-on:click="onClick">...</button>
</div>`,
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
    onClick(event) {
      this.viewer.toggleState();
    }
  },
  mounted() {
    
  }
});
// Change this component at your convenience:
Vue.component("LswWindowsMainTab", {
  template: `<div class="lsw_windows_main_tab">
        <div class="dialog_window" v-bind:key="'main_dialog'" :style="{ zIndex: 501 }">
            <div class="dialog_topbar">
                <div class="dialog_title">
                    Process manager
                </div>
                <div class="dialog_topbar_buttons">
                    <button class="mini" v-on:click="viewer.toggleState">X</button>
                </div>
            </div>
            <div class="dialog_body">
                <div v-for="dialog, dialogIndex, dialogCounter in $lsw.dialogs.opened" v-bind:key="'dialog-' + dialogIndex">
                    <a href="#">{{ dialogCounter + 1 }}. {{ dialog.title }} [{{ dialog.id }}]</a>
                </div>
            </div>
            <div class="dialog_footer">
                <button v-on:click="viewer.toggleState">Cancel</button>
            </div>
        </div>
</div>`,
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

  },
  mounted() {
    
  }
});
});
