import React from "react";
import styles from "./switch.module.scss";

interface SwitchProps {
  checked: boolean;
  onChange: () => void;
  label: string;
}

const Switch: React.FC<SwitchProps> = ({
	checked, onChange, label
}) => {

	return (
		<label className={styles.switch}>
			<input
				type="checkbox"
				checked={checked}
				onChange={onChange}
				role="switch"
				aria-checked={checked ? "true" : "false"}
				aria-label={label}
				tabIndex={0}
			/>
			<span className={styles.slider}></span>
			<span className={styles.text}>
				{label.toUpperCase()}
			</span>
		</label>
	);
};

export default Switch;
