/* eslint-disable unicorn/prefer-string-raw -- Don't use String.raw here for better bundler minification */

// All valid alpha TLDs.
// Data source: https://data.iana.org/TLD/tlds-alpha-by-domain.txt
const TLD_RE_PATTERN =
  'a(?:a(?:a|rp)|b(?:arth|b(?:ott|vie)?|c|le|ogado|udhabi)|c(?:ademy|c(?:enture|ountants?)|o|tor)?|d(?:s|ult)?|e(?:g|ro|tna)?|f(?:l|rica)?|g(?:akhan|ency)?|i(?:g|r(?:bus|force|tel))?|kdn|l(?:faromeo|i(?:baba|pay)|l(?:finanz|state|y)|s(?:ace|tom))?|m(?:azon|e(?:rican(?:express|family)|x)|fam|ica|sterdam)?|n(?:alytics|droid|quan|z)|ol?|p(?:artments|p(?:le)?)|q(?:uarelle)?|r(?:a(?:b|mco)|chi|my|pa|te?)?|s(?:da|ia|sociates)?|t(?:hleta|torney)?|u(?:ction|di(?:ble|o)?|spost|t(?:hor|os?))?|vianca|ws?|xa?|z(?:ure)?)|b(?:a(?:by|idu|n(?:a(?:mex|narepublic)|d|k)|r(?:c(?:elona|lay(?:card|s))|efoot|gains)?|s(?:eball|ketball)|uhaus|yern)?|b(?:c|t|va)?|c[gn]|d|e(?:a(?:ts|uty)|er|ntley|rlin|st(?:buy)?|t)?|f|g|h(?:arti)?|i(?:ble|d|ke|ngo?|o|z)?|j|l(?:ack(?:friday)?|o(?:ckbuster|g|omberg)|ue)|m[sw]?|n(?:pparibas)?|o(?:ats|ehringer|fa|m|nd|o(?:k(?:ing)?)?|s(?:ch|t(?:ik|on))|t|utique|x)?|r(?:adesco|idgestone|o(?:adway|ker|ther)|ussels)?|s|t|u(?:ild(?:ers)?|siness|y|zz)|v|w|y|zh?)|c(?:a(?:b|fe|l(?:l|vinklein)?|m(?:era|p)?|non|p(?:etown|ital(?:one)?)|r(?:avan|ds|e(?:ers?)?|s)?|s(?:a|e|h|ino)|t(?:ering|holic)?)?|b(?:a|n|re|s)|c|d|e(?:nter|o|rn)|f[ad]?|g|h(?:a(?:n(?:el|nel)|rity|se|t)|eap|intai|r(?:istmas|ome)|urch)?|i(?:priani|rcle|sco|t(?:adel|ic?|y(?:eats)?))?|k|l(?:aims|eaning|i(?:ck|ni(?:c|que))|o(?:thing|ud)|ub(?:med)?)?|m|n|o(?:ach|des|ffee|l(?:lege|ogne)|m(?:cast|m(?:bank|unity)|p(?:a(?:ny|re)|uter)|sec)?|n(?:dos|s(?:truction|ulting)|t(?:act|ractors))|o(?:king(?:channel)?|l|p)|rsica|u(?:ntry|pons?|rses))?|pa|r(?:edit(?:card|union)?|icket|own|s|uises?)?|u(?:isinella)?|v|w|x|y(?:mru|ou)?|z)|d(?:a(?:bur|d|nce|t(?:a|e|ing|sun)|y)|clk|ds|e(?:al(?:er|s)?|gree|l(?:ivery|l|oitte|ta)|mocrat|nt(?:al|ist)|si(?:gn)?|v)?|hl|i(?:amonds|et|gital|rect(?:ory)?|s(?:co(?:unt|ver)|h)|y)|j|k|m|np|o(?:c(?:s|tor)|g|mains|t|wnload)?|rive|tv|u(?:bai|nlop|pont|rban)|v(?:ag|r)|z)|e(?:a(?:rth|t)|co?|d(?:eka|u(?:cation)?)|e|g|m(?:ail|erck)|n(?:ergy|gineer(?:ing)?|terprises)|pson|quipment|r(?:icsson|ni)?|s(?:q|tate)?|t(?:isalat)?|u(?:rovision|s)?|vents|x(?:change|p(?:ert|osed|ress)|traspace))|f(?:a(?:ge|i(?:l|rwinds|th)|mily|ns?|rm(?:ers)?|s(?:hion|t))|e(?:dex|edback|rr(?:ari|ero))|i(?:at|d(?:elity|o)|lm|na(?:l|nc(?:e|ial))|r(?:e(?:stone)?|mdale)|sh(?:ing)?|t(?:ness)?)?|j|k|l(?:i(?:ckr|ghts|r)|o(?:rist|wers)|y)|m|o(?:o(?:d(?:network)?|tball)?|r(?:d|ex|sale|um)|undation|x)?|r(?:e(?:e|senius)|l|o(?:gans|nt(?:door|ier)))?|tr|u(?:jitsu|nd?|rniture|tbol)|yi)|g(?:a(?:l(?:l(?:ery|o|up))?|mes?|p|rden|y)?|b(?:iz)?|dn?|e(?:a|nt(?:ing)?|orge)?|f|g(?:ee)?|h|i(?:fts?|v(?:es|ing))?|l(?:ass|e|ob(?:al|o))?|m(?:ail|bh|o|x)?|n|o(?:daddy|l(?:d(?:point)?|f)|o(?:dyear|g(?:le)?)?|p|t|v)|p|q|r(?:a(?:inger|phics|tis)|een|ipe|o(?:cery|up))?|s|t|u(?:ardian|cci|ge|i(?:de|tars)|ru)?|w|y)|h(?:a(?:ir|mburg|ngout|us)|bo|dfc(?:bank)?|e(?:alth(?:care)?|l(?:p|sinki)|r(?:e|mes))|gtv|i(?:phop|samitsu|tachi|v)|kt?|m|n|o(?:ckey|l(?:dings|iday)|me(?:depot|goods|s(?:ense)?)|nda|rse|s(?:pital|t(?:ing)?)|t(?:el(?:es|s)|mail)?|use|w)|r|sbc|t|u(?:ghes)?|y(?:att|undai))|i(?:bm|c(?:bc|e|u)|d|e(?:ee)?|fm|kano|l|m(?:amat|db|mo(?:bilien)?)?|n(?:c|dustries|f(?:initi|o)|g|k|s(?:titute|ur(?:ance|e))|t(?:ernational|uit)?|vestments)?|o|piranga|q|r(?:ish)?|s(?:maili|t(?:anbul)?)?|t(?:au|v)?)|j(?:a(?:guar|va)|cb|e(?:ep|tzt|welry)?|io|ll|mp?|nj|o(?:b(?:s|urg)|t|y)?|p(?:morgan|rs)?|u(?:egos|niper))|k(?:aufen|ddi|e(?:rry(?:hotels|logistics|properties))?|fh|g|h|i(?:a|ds|m|nd(?:er|le)|tchen|wi)?|m|n|o(?:eln|matsu|sher)|p(?:mg|n)?|r(?:d|ed)?|uokgroup|w|y(?:oto)?|z)|l(?:a(?:caixa|m(?:borghini|er)|n(?:c(?:aster|ia)|d(?:rover)?|xess)|salle|t(?:ino|robe)?|w(?:yer)?)?|b|c|ds|e(?:ase|clerc|frak|g(?:al|o)|xus)|gbt|i(?:dl|fe(?:insurance|style)?|ghting|ke|lly|m(?:ited|o)|n(?:coln|de|k)|psy|v(?:e|ing))?|k|l[cp]|o(?:ans?|c(?:ker|us)|l|ndon|tt[eo]|ve)|pl(?:financial)?|r|s|t(?:da?)?|u(?:ndbeck|x(?:e|ury))?|v|y)|m(?:a(?:cys|drid|i(?:f|son)|keup|n(?:agement|go)?|p|r(?:ket(?:ing|s)?|riott|shalls)|serati|ttel)?|ba|c(?:kinsey)?|d|e(?:d(?:ia)?|et|lbourne|m(?:e|orial)|nu?|rckmsd)?|g|h|i(?:ami|crosoft|l|n[it]|t(?:subishi)?)|k|l[bs]?|ma?|n|o(?:bi(?:le)?|da|e|i|m|n(?:ash|ey|ster)|r(?:mon|tgage)|scow|to(?:rcycles)?|v(?:ie)?)?|p|q|r|sd?|t[nr]?|u(?:s(?:eum|ic)|tual)?|v|w|x|y|z)|n(?:a(?:b|goya|me|tura|vy)?|ba|c|e(?:c|t(?:bank|flix|work)?|ustar|ws?|x(?:t(?:direct)?|us))?|fl?|go?|hk|i(?:co|k(?:e|on)|nja|ssa[ny])?|l|o(?:kia|rt(?:hwesternmutual|on)|w(?:ruz|tv)?)?|p|r[aw]?|tt|u|yc|z)|o(?:b(?:i|server)|ffice|kinawa|l(?:ayan(?:group)?|dnavy|lo)|m(?:ega)?|n(?:e|g|l(?:ine)?)|oo|pen|r(?:a(?:cle|nge)|g(?:anic)?|igins)|saka|t(?:suka|t)|vh)|p(?:a(?:ge|nasonic|r(?:is|s|t(?:ners|s|y))|ssagens|y)?|ccw|et?|f(?:izer)?|g|h(?:armacy|d|ilips|o(?:ne|to(?:graphy|s)?)|ysio)?|i(?:c(?:s|t(?:et|ures))|d|n[gk]?|oneer|zza)|k|l(?:a(?:ce|y(?:station)?)|u(?:mbing|s))?|m|nc?|o(?:hl|ker|litie|rn|st)|r(?:a(?:merica|xi)|ess|ime|o(?:d(?:uctions)?|f|gressive|mo|pert(?:ies|y)|tection)?|u(?:dential)?)?|s|t|ub|wc?|y)|q(?:a|pon|ue(?:bec|st))|r(?:a(?:cing|dio)|e(?:a(?:d|l(?:estate|t(?:or|y)))|cipes|d(?:stone|umbrella)?|hab|i(?:sen?|t)|liance|n(?:t(?:als)?)?|p(?:air|ort|ublican)|st(?:aurant)?|views?|xroth)?|i(?:c(?:h(?:ardli)?|oh)|l|o|p)|o(?:c(?:her|ks)|deo|gers|om)?|s(?:vp)?|u(?:gby|hr|n)?|we?|yukyu)|s(?:a(?:arland|fe(?:ty)?|kura|l(?:e|on)|ms(?:club|ung)|n(?:dvik(?:coromant)?|ofi)|p|rl|s|ve|xo)?|b[is]?|c(?:a|b|h(?:aeffler|midt|o(?:larships|ol)|ule|warz)|ience|ot)?|d|e(?:a(?:rch|t)|cur(?:e|ity)|ek|lect|ner|rvices|ven|w|xy?)?|fr|g|h(?:a(?:ngrila|rp|w)|ell|i(?:a|ksha)|o(?:es|p(?:ping)?|uji|w(?:time)?))?|i(?:lk|n(?:a|gles)|te)?|j|k(?:in?|y(?:pe)?)?|l(?:ing)?|m(?:art|ile)?|n(?:cf)?|o(?:c(?:cer|ial)|ft(?:bank|ware)|hu|l(?:ar|utions)|n[gy]|y)?|p(?:a(?:ce)?|o(?:rt|t))|rl?|s|t(?:a(?:da|ples|r|te(?:bank|farm))|c(?:group)?|o(?:ckholm|r(?:age|e))|ream|ud(?:io|y)|yle)?|u(?:cks|pp(?:l(?:ies|y)|ort)|r(?:f|gery)|zuki)?|v|w(?:atch|iss)|x|y(?:dney|stems)?|z)|t(?:a(?:b|ipei|lk|obao|rget|t(?:a(?:motors|r)|too)|xi?)|ci?|dk?|e(?:am|ch(?:nology)?|l|masek|nnis|va)|f|g|h(?:d|eat(?:er|re))?|i(?:aa|ckets|enda|ffany|ps|r(?:es|ol))|j(?:maxx|x)?|k(?:maxx)?|l|m(?:all)?|n|o(?:day|kyo|ols|p|ray|shiba|tal|urs|wn|y(?:ota|s))?|r(?:a(?:d(?:e|ing)|ining|vel(?:channel|ers(?:insurance)?)?)|ust|v)?|t|u(?:be|i|nes|shu)|vs?|w|z)|u(?:a|b(?:ank|s)|g|k|n(?:i(?:com|versity)|o)|ol|ps|s|y|z)|v(?:a(?:cations|n(?:a|guard))?|c|e(?:gas|ntures|r(?:isign|sicherung)|t)?|g|i(?:ajes|deo|g|king|llas|n|p|rgin|s(?:a|ion)|v[ao])?|laanderen|n|o(?:dka|l(?:kswagen|vo)|t(?:e|ing|o)|yage)|u(?:elos)?)|w(?:a(?:l(?:es|mart|ter)|ng(?:gou)?|tch(?:es)?)|e(?:ather(?:channel)?|b(?:cam|er|site)|d(?:ding)?|i(?:bo|r))|f|hoswho|i(?:en|ki|lliamhill|n(?:dows|e|ners)?)|me|o(?:lterskluwer|odside|r(?:ks?|ld)|w)|s|t[cf])|x(?:box|erox|finity|i(?:huan|n)|xx|yz)|y(?:a(?:chts|hoo|maxun|ndex)|e|o(?:dobashi|ga|kohama|u(?:tube)?)|t|un)|z(?:a(?:ppos|ra)?|ero|ip|m|one|uerich|w)'

// Some common punctuations that can be used to stop a link
const PUNCTUATION_CHAR_PATTERN = '\\.\\,\\;\\!\\?'

const STOP_CHAR_PATTERN = '[' + PUNCTUATION_CHAR_PATTERN + ']'

const END_CHAR_PATTERN = '[^' + '\\s' + PUNCTUATION_CHAR_PATTERN + ']'

// dprint-ignore
const LINK_RE_BASE_PATTERN = (
    // start of the link group
    '(' + 
        '(?:' +
            // protocol identifier (optional)
            // short syntax // is allowed
            '(?:(?:https?:)?\\/\\/)?' +

            // host & domain names.
            '(?:' +
                '(?:' +
                    '[a-z0-9\\u00a1-\\uffff]' +
                    '[a-z0-9\\u00a1-\\uffff_-]{0,62}' +
                ')?' +
                '[a-z0-9\\u00a1-\\uffff]\\.' +
            ')+' +

            // TLD identifier name, must not end with dot
            '(?:' +
                TLD_RE_PATTERN +
            ')' +
        ')' +

        // port number (optional)
        '(?::\\d{2,5})?' +

        // sub path (optional)
        '(?:/' +
            '(?:' + 
                '\\S*' +
                END_CHAR_PATTERN +
            ')?' +
        ')?' +

        // query string (optional)
        '(?:\\?' + 
            '(?:' + 
                '\\S*' +
                END_CHAR_PATTERN +
            ')' +
        ')?' +

        // fragment (optional)
        '(?:\\#' + 
            '(?:' + 
                '\\S*' +
                END_CHAR_PATTERN +
            ')?' +
        ')?' +

    // end of the link group
    ')'
)

// dprint-ignore
const LINK_ENTER_PATTERN = LINK_RE_BASE_PATTERN + STOP_CHAR_PATTERN + '?' + '$'
// dprint-ignore
const LINK_INPUT_PATTERN = LINK_RE_BASE_PATTERN + STOP_CHAR_PATTERN + '?' + '\\s$'
// dprint-ignore
const LINK_MARK_PATTERN = LINK_RE_BASE_PATTERN + '(?=' + STOP_CHAR_PATTERN + '|\\s|$)'

export const LINK_ENTER_RE: RegExp = new RegExp(LINK_ENTER_PATTERN, 'gi')
export const LINK_INPUT_RE: RegExp = new RegExp(LINK_INPUT_PATTERN, 'gi')
export const LINK_MARK_RE: RegExp = new RegExp(LINK_MARK_PATTERN, 'gi')
