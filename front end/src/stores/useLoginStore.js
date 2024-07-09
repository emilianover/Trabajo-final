import { create } from "zustand"

const useLoginStore = create((set) => ({
    isLoginShow: false,
    toggleLoginShow: () => set(state => ({isLoginShow: state.isLoginShow ? false : true}))
}))

export { useLoginStore }
