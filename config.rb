require 'slim'

activate :external_pipeline, {
	name: :webpack,
	command: build? ?
		"NODE_ENV=production npm run build" :
		"NODE_ENV=develop npm run develop",
	source: "./build",
	latency: 1
}

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page '/path/to/file.html', layout: :otherlayout

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy '/this-page-has-no-template.html', '/template-file.html', locals: {
#  which_fake_page: 'Rendering a fake page with a local variable' }

###
# Helpers
###

helpers do
	def hostUrl link
		'https://zacky1972.github.io/middlman-bootstrap' + link
	end
end

# Reload the browser automatically whenever files change
# configure :development do
#   activate :livereload
# end

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     'Helping'
#   end
# end

# Build-specific configuration
configure :build do
  # Minify CSS on build
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  activate :asset_hash
  activate :asset_host, :host => 'https://zacky1972.github.io/middlman-bootstrap'
end

activate :deploy do |deploy|
	deploy.build_before = true
	deploy.deploy_method = :git
	deploy.branch = 'gh-pages'
end
