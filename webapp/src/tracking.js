/*global ga*/

import 'autotrack/lib/plugins/event-tracker';
import 'autotrack/lib/plugins/outbound-link-tracker';
import 'autotrack/lib/plugins/clean-url-tracker';
import 'autotrack/lib/plugins/max-scroll-tracker';
import 'autotrack/lib/plugins/page-visibility-tracker';

ga('create', 'UA-19569290-11', 'auto');
ga('set', 'anonymizeIp', true);
ga('require', 'eventTracker', {attributePrefix: 'data-ga-'});
ga('require', 'outboundLinkTracker');
ga('require', 'cleanUrlTracker');
ga('require', 'pageVisibilityTracker');
ga('send', 'pageview');
