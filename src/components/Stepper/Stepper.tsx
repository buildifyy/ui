const Stepper = () => {
  return (
    <div className="navbar h-[70px] w-[calc(100%-288px)] ml-[288px] bg-[rgb(var(--gray-2)/var(--tw-bg-opacity))]">
      <ol className="steps justify-center">
        <li className="step step-primary step-active overflow-hidden w-[10%]">
          <div className="step-circle">1</div>
          <h3>Active</h3>
        </li>
        <li className="step step-primary overflow-hidden w-[10%]">
          <div className="step-circle">2</div>
          <h3>Waiting</h3>
        </li>
        <li className="step step-primary overflow-hidden w-[10%]">
          <div className="step-circle">3</div>
          <h3>Waiting</h3>
        </li>
      </ol>
    </div>
  );
};

export default Stepper;
