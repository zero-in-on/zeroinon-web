import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),
  kit: {
    adapter: adapter({ strict: false }),
    prerender: {
      handleHttpError: (details) => void details,
    },
  },
};

export default config;
