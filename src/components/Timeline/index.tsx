import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { useCounterStore } from '../../state/store';
import { information as getInformation } from '../../helpers/information';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import { ariaLabel as getAriaLabel } from '../../helpers/acessibility';
import { ScrollButtonWrapper } from '../ScrollButton/ScrollButtonWrapper';

const Timeline = () => {
  const { 
    isLanguagePortuguese,
  } = useCounterStore();

  const { home: { timeline } } = getInformation(isLanguagePortuguese);
  const ariaLabel = getAriaLabel(isLanguagePortuguese);

  return (
    <div className="timeline" role="region" id="timeline">
      <VerticalTimeline
        layout="2-columns"
        className="timeline__container before:z-10"
        aria-label={ariaLabel.timeline.description}
      >
        {timeline.reverse().map((item, index) => (
          <VerticalTimelineElement
            className={`vertical-timeline-element--${item.type} timeline__item`}
            contentStyle={{ background: 'unset' }}
            date={item.date}
            dateClassName={`timeline__item--date timeline__text--${!(index % 2 === 0) ? "left" : "right"}`}
            key={index}
            icon={
              item.type === "work" ? (
                <FaBriefcase />
              ) : (
                <FaGraduationCap />
              )
            }
          >
            <div className="timeline__text">
              <h3 className={`text-sm  timeline__text--${index % 2 === 0 ? "left" : "right"}`}>
                {item.position}
              </h3>
              <h4 className={`text-xs timeline__text--${index % 2 === 0 ? "left" : "right"}`}>
                {item.location}
              </h4>
            </div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
      <ScrollButtonWrapper direction="up" href="#timeline" className="timeline__scroll-button" />
    </div>
  )
}

export default Timeline