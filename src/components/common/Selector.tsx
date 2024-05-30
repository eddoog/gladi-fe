import SwitchSelector from "react-switch-selector";

const options = [
  {
    label: "EN",
    value: "english",
    selectedBackgroundColor: "#0097e6",
    innerHeight: 50
  },
  {
    label: "ID",
    value: "indonesia",
    selectedBackgroundColor: "#0097e6"
  }
];

const onChange = (newValue: any) => {
  console.log(newValue);
};

const initialSelectedIndex = options.findIndex(({ value }) => value === "bar");

export function Selector() {
  return (
    <div style={{height: "50px"}}>
      <SwitchSelector
        onChange={onChange}
        options={options}
        initialSelectedIndex={initialSelectedIndex}
      />
    </div>
  );
}