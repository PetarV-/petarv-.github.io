module ArchiveItems
    class Generator < Jekyll::Generator
        @@month_names = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ]

        def generate(site)
            times = site.posts.docs.map {|post| { month: post.date.strftime('%-m'), year: post.date.strftime('%Y') } }.uniq
            site.data['months'] = times.map { |time|
                {
                    'string' => @@month_names[time[:month].to_i - 1] + ' ' + time[:year],
                    'month' => time[:month],
                    'year' => time[:year]
                }
            }
        end
    end
end
