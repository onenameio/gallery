'use strict';

/* Services */

angular.module('profileviewerApp')
.factory('Samples', [function() {
    var Samples = {};
    Samples.user = function() {
        var sampleUser = {
            username: 'ryanshea',
            name: 'Ryan Shea',
            contactMethods: [
              { type: 'email', identifier: 'ryan@shea.io', iconClass: 'fa-envelope-o',
                url: '#' },
              { type: 'phone', identifier: '5515563914', iconClass: 'fa-mobile-phone',
                url: '#' },
              { type: 'skype', identifier: 'ryaneshea', iconClass: 'fa-skype',
                url: 'skype:ryaneshea' },
              { type: 'bitmessage', identifier: 'BM-2cSqtKVx27J8FZunKqjcsbfKQAhbgWnLdg',
                url: 'bitmsg:BM-2cSqtKVx27J8FZunKqjcsbfKQAhbgWnLdg' }
            ],
            avatarUrl: 'https://s3.amazonaws.com/97p/tux.jpg',
            backgroundUrl: 'https://s3.amazonaws.com/dx3/ryanshea',
            location: 'New York, NY',
            bio: 'Co-founder of Onename with @Muneeb. Bitcoin, identity, the blockchain, and decentralization.',
            featuredFriends: [
              { username: 'muneeb', avatarUrl: 'https://s3.amazonaws.com/kd4/muneeb' },
              { username: 'albertwenger', avatarUrl: 'https://pbs.twimg.com/profile_images/1773890030/aew_artistic_bigger.gif' },
              { username: 'naval', avatarUrl: 'https://pbs.twimg.com/profile_images/3696617328/667874c5936764d93d56ccc76a2bcc13.jpeg' },
              { username: 'arianna', avatarUrl: 'https://s3.amazonaws.com/97p/ariannas-profile.jpg' },
            ],
            unfeaturedFriendCount: 24,
            shortPgpFingerprint: 'A93E A312',
            shortOtrFingerprint: '756C E84F',
            keychain: [
              { type: 'pgp', fingerprint: 'DDA1CF3D659064044EC99354429E1A42A93EA312', value: 'https://s3.amazonaws.com/97p/pubkey.asc' },
              { type: 'otr', fingerprint: '756CE84F 90ABDE84 0555F4E2 E0B2ACB1 297F9E65' },
              { type: 'bitcoin', fingerprint: '1FbynFXB1C6jSAQZivucAnzAm9N7GxURYa', value: '083a0518062cc3c5ad48501c60aa06059785449f579a256ed2f1a5e781a109d978e54b20fb43b6e90dc91d8f9898665b969e122df6e1d1e5ce06c790f618a2c4'},
            ],
            payments: [
              { type: 'bitcoin', identifier: '14eautXfJT7EZsKfm1eHSAPnHkn3w1XF9R' },
              { type: 'namecoin', identifier: 'N4izoiyX9XKapXqsts7bSN7c3Bcgnr9aeo' },
              { type: 'dogecoin', identifier: 'DMHjRxrKN48EQZQDmmoghxZPRRZrvDJeVh' },
              { type: 'quarkcoin', identifier: '' }
            ],
            profiles: [
              { type: 'twitter', iconClass: 'fa-twitter', username: 'ryaneshea',
                url: 'https://twitter.com/ryaneshea',
                proofUrl: 'https://twitter.com/ryaneshea/status/486057647808868352'
              },
              { type: 'facebook', iconClass: 'fa-facebook', username: 'ryaneshea',
                url: 'https://facebook.com/ryaneshea',
                proofUrl: 'https://facebook.com/ryaneshea/posts/10152385985597713'
              },
              { type: 'github', iconClass: 'fa-github', username: 'rxl',
                url: 'https://github.com/rxl',
                proofUrl: 'https://gist.github.com/rxl/9799732'
              },
              { type: 'linkedin', iconClass: 'fa-linkedin', username: 'ryaneshea',
                url: 'https://www.linkedin.com/in/ryaneshea',
                proofUrl: 'https://www.linkedin.com'
              },
              { type: 'instagram', iconClass: 'fa-instagram', username: 'ryaneshea',
                url: 'http://instagram.com/ryaneshea',
                proofUrl: 'http://instagram.com/ryaneshea'
              },
              { type: 'reddit', iconClass: 'fa-reddit', username: 'ryaneshea',
                url: 'http://www.reddit.com/user/ryaneshea/',
                proofUrl: 'http://www.reddit.com/user/ryaneshea/'
              },
              { type: 'hackernews', iconClass: 'fa-hacker-news', username: 'rxl',
                url: 'https://news.ycombinator.com/user?id=rxl',
                proofUrl: 'https://news.ycombinator.com/user?id=rxl'
              },
              { type: 'stackoverflow', iconClass: 'fa-stack-overflow', username: '/users/1530754/ryan',
                url: 'http://stackoverflow.com/users/1530754/ryan',
                proofUrl: 'http://stackoverflow.com/users/1530754/ryan'
              },
              { type: 'angellist', iconClass: 'fa-angellist', username: 'ryanshea',
                url: 'https://angel.co/ryanshea',
                proofUrl: 'https://angel.co/ryanshea'
              },
              { type: 'googleplus', iconClass: 'fa-google-plus', username: 'Ryan Shea',
                url: 'https://plus.google.com/110166845166458482181/posts',
                proofUrl: 'https://plus.google.com/110166845166458482181/posts'
              },
            ],
            websites: [
              { type: 'website dark-gradient', iconClass: 'fa-link', username: 'shea.io',
                url: 'http://shea.io',
                proofUrl: 'http://shea.io/.well-known/openname.txt'
              },
              { type: 'website dark-gradient', iconClass: 'fa-link', username: 'onename.io',
                url: 'https://onename.io',
                proofUrl: 'https://onename.io/.well-known/openname.txt'
              },
            ]
        };
        return sampleUser;
    };
    return Samples;
}])
;