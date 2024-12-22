# _plugins/sort_fallback_plugin.rb
module Jekyll
  class SortFallbackGenerator < Jekyll::Generator
    safe true
    priority :high

    def generate(site)
      process_posts(site) if site.collections['posts']
    end

    private

    def process_posts(site)
      site.collections['posts'].docs.each do |post|
        puts "...processing sortable date for #{post.path}"
        add_sortable_date(post)
      end
    end

    def add_sortable_date(post)
      post.data["sortable_date"] = post.data["last_updated"] || post.data["date"]
    end
  end
end