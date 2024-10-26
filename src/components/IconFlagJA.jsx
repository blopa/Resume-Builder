import SvgIcon from '@material-ui/core/SvgIcon';

const IconFlagJP = (props) => (
    <SvgIcon viewBox="-5 -5 30 20" {...props}>
        {/* White background */}
        <rect fill="#ffffff" x="-5" y="-5" width="30" height="20" />
        {/* Red circle */}
        <circle fill="#bc002d" cx="10" cy="5" r="6" />
    </SvgIcon>
);

export default IconFlagJP;
