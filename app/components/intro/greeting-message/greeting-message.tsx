import Information from "@/app/helpers/classes/Information";
import styles	from "./greeting-message.module.scss";
import Typewriter from "../../typewriter/typewriter";
import { Fragment } from "react";

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
						<Fragment key={index}>
							{index > 0 && <br />}
							<span >{line}</span>
						</Fragment>
					);
				}
			})}
		</div>
	);
};

export default GreetingMessage;
