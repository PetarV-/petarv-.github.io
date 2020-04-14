# Based on distance_of_time_in_words from
# <https://github.com/rails/rails/blob/97f2c4129ae23ee074986a588628acc689a86462/actionview/lib/action_view/helpers/date_helper.rb>
module Jekyll
    module TimeAgoInWordsFilter
        MINUTES_IN_YEAR = 525600
        MINUTES_IN_QUARTER_YEAR = 131400
        MINUTES_IN_THREE_QUARTERS_YEAR = 394200

        def pluralize(count, str)
            case count
            when 1 then "#{count} #{str}"
            else "#{count} #{str}s"
            end
        end

        def time_ago_in_words(from_time)
            to_time = Time.now

            from_time = from_time.to_time if from_time.respond_to?(:to_time)
            to_time = to_time.to_time if to_time.respond_to?(:to_time)
            from_time, to_time = to_time, from_time if from_time > to_time
            distance_in_minutes = ((to_time - from_time)/60.0).round

            case distance_in_minutes
            when 0..1 then
                return distance_in_minutes == 0 ?
                    "less than 1 minute" :
                    pluralize(distance_in_minutes, "minute")

            when 2...45           then pluralize(distance_in_minutes, "minute")
            when 45...90          then "about 1 hour"
                # 90 mins up to 24 hours
            when 90...1440        then "about #{pluralize((distance_in_minutes.to_f / 60.0).round, "hour")}"
                # 24 hours up to 42 hours
            when 1440...2520      then "1 day"
                # 42 hours up to 30 days
            when 2520...43200     then pluralize((distance_in_minutes.to_f / 1440.0).round, "day")
                # 30 days up to 60 days
            when 43200...86400    then "about #{pluralize((distance_in_minutes.to_f / 43200.0).round, "month")}"
                # 60 days up to 365 days
            when 86400...525600   then pluralize((distance_in_minutes.to_f / 43200.0).round, "month")
            else
                fyear = from_time.year
                fyear += 1 if from_time.month >= 3
                tyear = to_time.year
                tyear -= 1 if to_time.month < 3
                leap_years = (fyear > tyear) ? 0 : (fyear..tyear).count{|x| Date.leap?(x)}
                minute_offset_for_leap_year = leap_years * 1440
                # Discount the leap year days when calculating year distance.
                # e.g. if there are 20 leap year days between 2 dates having the same day
                # and month then the based on 365 days calculation
                # the distance in years will come out to over 80 years when in written
                # English it would read better as about 80 years.
                minutes_with_offset = distance_in_minutes - minute_offset_for_leap_year
                remainder                   = (minutes_with_offset % MINUTES_IN_YEAR)
                distance_in_years           = (minutes_with_offset.div MINUTES_IN_YEAR)
                if remainder < MINUTES_IN_QUARTER_YEAR
                    "about #{pluralize(distance_in_years, "year")}"
                elsif remainder < MINUTES_IN_THREE_QUARTERS_YEAR
                    "over #{pluralize(distance_in_years, "year")}"
                else
                    "almost #{pluralize(distance_in_years + 1, "year")}"
                end
            end
        end

        private :pluralize
    end
end

Liquid::Template.register_filter(Jekyll::TimeAgoInWordsFilter)
