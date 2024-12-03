import { ref, type Ref } from 'vue';

type State<T> = [Ref<T>, (newState: T) => void];

export function useState<T>(initialState: T): State<T> {
  const state = ref<T>(initialState);

  function setState(newState: T) {
    state.value = newState;
  }

  return [state as Ref<T>, setState];
}
