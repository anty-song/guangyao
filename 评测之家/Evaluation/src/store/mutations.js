export default {
  handleAuthModal(state, flag) {
    state.showAccount = flag;
  },
  goRegister(state) {
    state.isRegister = true;
    return state.isRegister;
  }
}