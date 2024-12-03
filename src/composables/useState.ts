import { effectScope, ref, type Ref } from 'vue';

type State<T> = [Ref<T>, (newState: T) => void];

export function useState<T>(initialState: T): State<T> {
  const scope = effectScope();
  const state = scope.run(() => ref<T>(initialState)) as Ref<T>;

  function setState(newState: T) {
    state.value = newState;
  }

  return [state, setState];
}
