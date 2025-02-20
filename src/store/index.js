import { proxy } from 'valtio';

const state = proxy({
  intro: true,
  color: '#EFBD48',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: '/threejs.png',
  fullDecal: '/threejs.png',
  decals: {},

  setFile: (decalId, file) => {
    state.decals[decalId] = file;
  }
});

export default state;