module Jekyll
  class TagPage < Page
    def initialize(site, base, dir, tag)
      @site = site
      @base = base
      @dir = dir
      @name = "index.html"

      self.process(@name)
      self.read_yaml(File.join(base, "_layouts"), "tag.liquid")
      self.data["tag"] = tag
      tag_title = tag.gsub(/\b\w/) { |word| word.upcase }
      self.data["title"] = "Tag: #{tag_title}"
    end
  end

  class TagPageGenerator < Generator
    safe true

    def generate(site)
      if site.layouts.key? "tag"
        dir = "tag"
        site.tags.keys.each do |tag|
          site.pages << TagPage.new(site, site.source, File.join(dir, tag.downcase.gsub(" ", "-")), tag)
        end
      end
    end
  end
end 