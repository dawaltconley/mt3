---
layout: default
---

{::options parse_block_html="true" /}

<div class="margin-auto-h padding-l-v padding-m-h text-wrapper">

![{{ site.title }}]({{ site.logo.png | prepend: site.baseurl }})
{: class="half-width margin-auto-h" }

# Press Kit
{: class="text-center" }

<ul class="full-width flex-row flex-center media-icon-basic media-icon-list font-size-large">
{% include all-media-icons.liquid icon_set=site.contact style="o play" list="true" microdata=true %}
</ul>

## Artist Information

Label: Self-Released  
Genre: Alternative / Indie Rock  
Hometown: Brooklyn, NY  
Sounds Like: Slow Mass, Dinosaur Jr, mewithoutyou  

## Bio

Just the right balance of bark and bite. The project started with the release of Temper Tantrum, written together by Robert and Dylan during their time at Wesleyan University. Since moving to New York, the band has added Aidan and Henry. Musically, they take inspiration from the alternative bands of the 90s and 00s — but not enough to consider the band simply nostalgic; they’ve incorporated elements of punk, indie, folk, and post-hardcore to create a genre mash of indie trash. They write songs about malcontent in society and themselves and geek out whenever they can do something in an alternative time signature.

## Band Members

- Robert Don -- Guitar / Vox
- Henry Robertson -- Lead Guitar
- Aidan Boardman -- Bass
- Dylan Awalt-Conley -- Drums

## Upcoming Shows

{% include shows.html %}

## Photos

<div class="flex-row flex-even">
{% for photo in site.press_photos %}
![]({{ photo | prepend: site.baseurl }})
{% endfor %}
</div>

## Videos

<div class="aspect-16-9 margin-m-b">
<iframe itemprop="url" src="https://www.youtube.com/embed/4Ihh8SwPg80" allowfullscreen data-analytics-category="Video" data-analytics-action="click" data-analytics-label="Watched I Wanna Be a Machine"></iframe>
</div>

## Audio

<iframe class="full-width margin-m-b mq-bandcamp-height" src="https://bandcamp.com/EmbeddedPlayer/album=2871722682/size=large/bgcol=ffffff/linkcol=0687f5/artwork=none/transparent=true/" seamless itemprop="audio" data-analytics-category="Audio" data-analytics-action="click" data-analytics-label="Listened to Temper Tantrum">
<a href="http://moretongues.bandcamp.com/album/temper-tantrum">Temper Tantrum by More Tongues Than Teeth</a>
</iframe>

## Contact/Booking

[moretonguesthanteeth@gmail.com](mailto:moretonguesthanteeth@gmail.com)

</div>
