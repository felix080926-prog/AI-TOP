(function () {
    'use strict';

    function headingText(h2) {
        var clone = h2.cloneNode(true);
        var anchor = clone.querySelector('.anchor');
        if (anchor && anchor.parentNode) anchor.parentNode.removeChild(anchor);
        return clone.textContent.replace(/\s+/g, ' ').trim();
    }

    function countItems(nodes) {
        var n = 0;
        nodes.forEach(function (el) {
            n += el.querySelectorAll('li').length;
        });
        return n;
    }

    function build() {
        var content = document.querySelector('.post-content');
        if (!content) return;

        var children = Array.prototype.slice.call(content.children);
        var sections = [];
        var current = null;

        children.forEach(function (el) {
            if (el.tagName === 'H2') {
                current = { title: headingText(el), nodes: [el] };
                sections.push(current);
            } else if (current) {
                current.nodes.push(el);
            }
        });

        if (sections.length < 2) return;

        var total = sections.reduce(function (sum, s) {
            return sum + countItems(s.nodes);
        }, 0);

        var nav = document.createElement('nav');
        nav.className = 'projects-filter';
        nav.setAttribute('aria-label', '项目分类');

        var pills = [];

        function addPill(label, count, section) {
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'pf-pill';

            var labelEl = document.createElement('span');
            labelEl.className = 'pf-label';
            labelEl.textContent = label;

            var countEl = document.createElement('span');
            countEl.className = 'pf-count';
            countEl.textContent = count;

            btn.appendChild(labelEl);
            btn.appendChild(countEl);
            btn.addEventListener('click', function () {
                select(btn, section);
            });

            nav.appendChild(btn);
            pills.push(btn);
        }

        function apply(section) {
            sections.forEach(function (s) {
                var hide = section && s !== section;
                s.nodes.forEach(function (el) {
                    el.classList.toggle('pf-hidden', !!hide);
                });
            });
        }

        function select(btn, section) {
            pills.forEach(function (p) {
                p.classList.toggle('active', p === btn);
            });
            apply(section);
        }

        addPill('全部', total, null);
        sections.forEach(function (s) {
            addPill(s.title, countItems(s.nodes), s);
        });

        content.insertBefore(nav, content.firstChild);
        if (pills[0]) pills[0].classList.add('active');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', build);
    } else {
        build();
    }
})();
