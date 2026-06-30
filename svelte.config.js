import adapter from '@sveltejs/adapter-vercel'


//TODO: rm runtime line, if not using vercel
const config = {
  kit: {
    adapter: adapter({
			runtime: 'nodejs22.x'
		}),
  },

  onwarn(warning, handler) {
		// Ignore every compiler warning
	},
}

export default config;