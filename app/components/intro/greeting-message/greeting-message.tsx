import Information from "@/app/helpers/classes/Information";
import styles	from "./greeting-message.module.scss";
import Typewriter from "../../typewriter/typewriter";

const GreetingMessage = (information: Information) => {
	return (
		<div className={styles["greeting-message"]}>
			{information._greetingMessage.map((line, index) => {
				if (line.trim() === information._name) {
					return (
						<Typewriter
							key={index}
							text={line}
							delay={100}
							infinite={true}
						/>
					);
				} else {
					return (
						<>
							<br />
							<span key={index}>{line}</span>
						</>
					);
				}
			})}
		</div>
	);
};

export default GreetingMessage;
