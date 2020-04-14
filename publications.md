---
layout: post
title: Researching
index: 2
class: page blog post
---

Throughout my academic career, I've been fortunate to contribute to a wide variety of research directions, including graph representation learning, computational biology, medical imaging, cross-modal learning, reinforcement learning, and deep learning on low-power/embedded systems. A detailed list of relevant publications is provided below. 

Currently, my main research interests are on **graph representation learning for <em>algorithmic reasoning</em>**. This new and exciting direction seeks to understand and employ the expressive power of GNNs for modelling classical algorithms. The implications are potentially massive: enabling scalable solutions to tasks such as meta-learning and search, aiding novel discoveries in theoretical computer science, and rigorously benchmarking GNNs. For more details, you may <a href="https://openreview.net/forum?id=SkgKO0EtvS">consult</a> <a href="https://openreview.net/forum?id=rJxbJeHFPS">these</a> <a href="https://openreview.net/forum?id=rJg7BA4YDr">papers</a>.

I would be happy to discuss any project idea at the intersection of the above areas; feel free to <a href="https://aemail.com/wpmM">reach out</a> if you are interested!

# Conference Publications

<ul id="publications">
    {% for track in site.data.conference.tracks %}
    <li><div>
            <img class="cover-artwork" src="{{ track.artwork_url }}" />
            <div class="track-meta"><div class="track-name">{{ track.name }}</div>
            <div class="track-meta-row"><span class="track-meta-row-label">by</span> <span class="track-artist">{{ track.artist | markdownify }}</span></div>
            {% if track.album %}
            <div class="track-meta-row"><span class="track-meta-row-label">in</span> <span class="track-album">{{ track.album.name }}</span> <span class="track-album-year">({{ track.album.year }})</span></div></div>
            {% endif %}
          {% if track.url %}<a href="{{ track.url }}"></a>{% endif %}</div></li>
    {% endfor %}
</ul>

# Journal Publications

<ul id="publications">
    {% for track in site.data.journal.tracks %}
    <li><div>
            <img class="cover-artwork" src="{{ track.artwork_url }}" />
            <div class="track-meta"><div class="track-name">{{ track.name }}</div>
            <div class="track-meta-row"><span class="track-meta-row-label">by</span> <span class="track-artist">{{ track.artist | markdownify }}</span></div>
            {% if track.album %}
            <div class="track-meta-row"><span class="track-meta-row-label">in</span> <span class="track-album">{{ track.album.name }}</span> <span class="track-album-year">({{ track.album.year }})</span></div></div>
            {% endif %}
          {% if track.url %}<a href="{{ track.url }}"></a>{% endif %}</div></li>
    {% endfor %}
</ul>

# Workshop Publications

<ul id="publications">
    {% for track in site.data.workshop.tracks %}
    <li><div>
            <img class="cover-artwork" src="{{ track.artwork_url }}" />
            <div class="track-meta"><div class="track-name">{{ track.name }}</div>
            <div class="track-meta-row"><span class="track-meta-row-label">by</span> <span class="track-artist">{{ track.artist | markdownify }}</span></div>
            {% if track.album %}
            <div class="track-meta-row"><span class="track-meta-row-label">in</span> <span class="track-album">{{ track.album.name }}</span> <span class="track-album-year">({{ track.album.year }})</span></div></div>
            {% endif %}
          {% if track.url %}<a href="{{ track.url }}"></a>{% endif %}</div></li>
    {% endfor %}
</ul>
