/*
  @artifact:  Lite Starter Web Dependency
  @url:       https://github.com/allnulled/lsw-windows.git
  @name:      @allnulled/lsw-windows
  @version:   1.0.0
*/(function(factory) {
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
    <lsw-dialogs ref="dialogs" :as-windows="true"></lsw-dialogs>
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
                    <div>Process manager</div>
                </div>
                <div class="dialog_topbar_buttons">
                    <button v-if="$consoleHooker?.is_shown === false" class="mini" style="white-space: nowrap;flex: 1; margin-right: 4px;" v-on:click="() => $consoleHooker.show()">Show console</button>
                    <button class="mini" v-on:click="viewer.toggleState">-</button>
                </div>
            </div>
            <div class="dialog_body">
                <div class="main_tab_topbar">
                    <button class="" v-on:click="openRest">DB</button>
                    <button class="" v-on:click="openFilesystem">FS</button>
                </div>
                <div v-for="dialog, dialogIndex, dialogCounter in $lsw.dialogs.opened" v-bind:key="'dialog-' + dialogIndex">
                    <a href="javascript:void(0)" v-on:click="() => viewer.selectDialog(dialogIndex)">{{ dialogCounter + 1 }}. {{ dialog.title }} [{{ dialog.id }}]</a>
                </div>
            </div>
            <div class="dialog_footer">
                <button class="" v-on:click="viewer.toggleState">Minimize</button>
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
});

