---
layout: default
itemtype: "http://schema.org/MusicGroup"
---

<meta itemprop="url" content="{{ site.url | append: site.baseurl }}">

{::options parse_block_html="true" /}

<article class="margin-auto-h padding-l-v padding-m-h text-wrapper">

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

Just the right balance of bark and bite. The project started with the release of Temper Tantrum, written together by Robert and Dylan during their time at Wesleyan University. Since moving to New York, the band has added Aidan and Henry. Musically, they take inspiration from the alternative bands of the 90s and 00s — but not enough to consider the band simply nostalgic; they’ve incorporated elements of punk, indie, folk, and post-hardcore to create a genre mash of indie trash. They write songs about malcontent in society and themselves and geek out whenever they can do something in an alternative time signature.

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
<iframe itemprop="url" src="https://www.youtube.com/embed/4Ihh8SwPg80" allowfullscreen data-analytics-category="Video" data-analytics-action="click" data-analytics-label="Watched I Wanna Be a Machine"></iframe>
</div>

## Audio

<iframe class="full-width margin-m-b mq-bandcamp-height" src="https://bandcamp.com/EmbeddedPlayer/album=2871722682/size=large/bgcol=ffffff/linkcol=0687f5/artwork=small/transparent=true/" seamless itemprop="audio" data-analytics-category="Audio" data-analytics-action="click" data-analytics-label="Listened to Temper Tantrum" itemprop="album" itemscope itemtype="http://schema.org/MusicAlbum">
<a href="http://moretongues.bandcamp.com/album/temper-tantrum"><span itemprop="name">Temper Tantrum</span> by More Tongues Than Teeth</a>
</iframe>

## Contact & Booking

Email us at [{{ site.contact.email }}](mailto:{{ site.contact.email }}){:itemprop="email"}

</article>
