export default {
    data() {
      return {
        currentTheme: "",
        token: localStorage.getItem('token')
      };
    },
    mounted() {
      const storedTheme = localStorage.getItem("theme-size");
      if (!storedTheme) {
        this.currentTheme = "theme-large";
      } else {
        this.currentTheme = localStorage.getItem("theme-size");
      }
    },
    methods: {
      toggleClass() {
        let silverBtnModal = localStorage.getItem('silverBtn-modal')
        const storedTheme = localStorage.getItem("theme-size");
        console.log(storedTheme);
  
        if (!storedTheme) {
          localStorage.setItem("theme-size", "theme-small");
          this.currentTheme = "theme-small";
        }
        if (storedTheme === "theme-large") {
          localStorage.setItem("theme-size", "theme-small");
          this.currentTheme = "theme-small";
        } else {
          localStorage.setItem("theme-size", "theme-large");
          this.currentTheme = "theme-large";
        }
      }
    }
  };
  