<template>
  <transition name="modal-fade">
    <div :class="`modal-backdrop ${modalSize ? '' : ''}`">
      <div
        :class="`modal ${modalSize ? modalSize : ''}`"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <slot name="header"> </slot>
        </header>

        <section class="modal-body" id="modalDescription">
          <slot name="body"> </slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer"> </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "CustomModal",
  props: {
    modalSize: String,
  },
  mounted() {
    var body = document.querySelector("html");
    body.style.overflow = "hidden";
  },
  unmounted() {
    var body = document.querySelector("html");
    body.style.overflow = "";
  },
};
</script>
<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
  max-width: 768px;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
}

.modal {
  background: #ffffff;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  width: 280px;
  max-width: 100%;
  border-radius: 10px;
  padding: 40px 24px 30px;
  text-align: center;
}
.modal.modal-lg {
  width: 343px;
}
.modal-content {
  padding: 24px;
}
.modal-content p {
  font-size: 14px;
  line-height: 18px;
  color: #25282b;
}
.modal-header {
  position: relative;
  justify-content: space-between;
  display: flex;
}

.modal-header h2 {
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  color: #25282b;
  text-align: center;
  margin-top: 24px;
  width: 100%;
}

.modal-footer {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.modal-footer .btn-black {
  background: #090909;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: #ffffff;
  text-transform: uppercase;
  padding: 20px;
}

.modal-body {
  position: relative;
  padding: 0;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
