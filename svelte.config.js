import adapter from '@sveltejs/adapter-vercel'

const config = {
  kit: {
    adapter: adapter(),
    csrf: {
      checkOrigin: false,
    }
  },
}

export default config;