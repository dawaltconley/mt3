---
layout: default
itemtype: "http://schema.org/MusicGroup"
---

<meta itemprop="url" content="{{ site.url | append: site.baseurl }}">

{::options parse_block_html="true" /}

<article class="margin-auto-h padding-l-v padding-m-h text-wrapper" data-analytics-category="Navigation" data-analytics-action="view" data-analytics-label="Scrolled entire EPK">

<header>
<meta itemprop="logo" content="{{ site.logo.png | prepend: site.baseurl | prepend: site.url }}">
[![{{ site.title }}]({{ site.logo.svg.black | prepend: site.baseurl }})]({{ site.baseurl }}/)
{: class="logo-width-epk margin-auto-h" }

<span itemprop="name">More Tongues Than Teeth</span><span class="hidden"> Press Kit</span>
================================
{: class="text-center" }

<ul class="full-width flex-row flex-center media-icon-basic media-icon-list font-size-large">
{% include all-media-icons.liquid icon_set=site.contact style="o play" list="true" microdata=true %}
</ul>
</header>

## Artist Information

Label: Self-Released  
Genre: <span itemprop="genre">Alternative / Indie Rock</span>  
Hometown: Brooklyn, NY  
Sounds Like: Slow Mass, Dinosaur Jr, mewithoutyou  

## Bio

More Tongues Than Teeth started with the release of Temper Tantrum, written together by Robert and Dylan during their time at Wesleyan University. Since moving to New York, the band has added Aidan and Henry and developed a fuller, heavier sound. They take inspiration from the alternative music of the 90s and 00s, incorporating elements of punk, indie, folk, and post-hardcore into a genre mash of indie trash. They write songs about social and personal unrest that flirt with odd forms and time signatures, while still recalling the singer-songwriter roots of Temper Tantrum.

## Band Members

- <span itemprop="member">Robert Don</span> -- Guitar / Vox
- <span itemprop="member">Henry Robertson</span> -- Lead Guitar
- <span itemprop="member">Aidan Boardman</span> -- Bass
- <span itemprop="member">Dylan Awalt-Conley</span> -- Drums

## Upcoming Shows

{% include shows.html %}

## Photos & Artwork

Click to expand.

{% include photo-stream.html photos=site.press_photos %}

## Videos

<div class="aspect-16-9 expand-children margin-m-b">
<meta itemprop="name" content="Safety First">
<meta itemprop="thumbnailUrl" content="https://i.ytimg.com/vi_webp/qYNsF3leK58/maxresdefault.webp">
<meta itemprop="uploadDate" content="2019-01-09">
<iframe itemprop="url" src="https://www.youtube.com/embed/qYNsF3leK58" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen data-analytics-category="Video" data-analytics-action="click" data-analytics-label="Watched Safety First"></iframe>
</div>

<div class="aspect-16-9 expand-children margin-m-b">
<meta itemprop="name" content="I Wanna Be A Machine Music Video">
<meta itemprop="thumbnailUrl" content="https://i.ytimg.com/vi_webp/4Ihh8SwPg80/maxresdefault.webp">
<meta itemprop="uploadDate" content="2017-06-06">
<iframe itemprop="url" src="https://www.youtube.com/embed/4Ihh8SwPg80" allowfullscreen data-analytics-category="Video" data-analytics-action="click" data-analytics-label="Watched I Wanna Be a Machine"></iframe>
</div>

## Audio

<iframe class="full-width margin-m-b mq-bandcamp-height" src="https://bandcamp.com/EmbeddedPlayer/album=2871722682/size=large/bgcol=ffffff/linkcol=0687f5/artwork=small/transparent=true/" seamless itemprop="audio" data-analytics-category="Audio" data-analytics-action="click" data-analytics-label="Listened to Temper Tantrum" itemprop="album" itemscope itemtype="http://schema.org/MusicAlbum">
<a href="http://moretongues.bandcamp.com/album/temper-tantrum"><span itemprop="name">Temper Tantrum</span> by More Tongues Than Teeth</a>
</iframe>

## Contact & Booking

Email us at [{{ site.contact.email }}](mailto:{{ site.contact.email }}){:itemprop="email"}

</article>
