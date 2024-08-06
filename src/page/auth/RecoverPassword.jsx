import { Button, Col, Flex, Form, Input, message, Row, Space, Steps, theme } from "antd"
import Title from "antd/es/typography/Title"
import { useEffect, useState } from "react"
import { requestRecoverPassword, resetPassword, sendVerifyOTP } from "../../services/account_services"
import { useNavigate } from "react-router-dom"
import { ArrowLeftOutlined, LockOutlined, MailOutlined, SignatureOutlined, UserOutlined } from "@ant-design/icons"


export const RecoverPassword = () => {
   const { token } = theme.useToken()
   const [form] = Form.useForm()
   const [current, setCurrent] = useState(0)
   const [email, setEmail] = useState(null)
   const [otp, setOTP] = useState(null)
   const [newPass, setNewPass] = useState(null)
   const [newPassConfirm, setNewPassConfirm] = useState(null)
   const [countDown, setCountDown] = useState(0)
   const [resendDisabled, setResendDisabled] = useState(false)

   useEffect(() => {
      let intervalId
      if (countDown > 0) {
         intervalId = setInterval(
            () => setCountDown(countDown - 1),
            1000
         )
      } else {
         setResendDisabled(false)
      }
      return () => clearInterval(intervalId)
   }, [countDown])

   const navigate = useNavigate()

   const onChange = (values) => {
      setOTP(values)
   };

   const handleEmailChange = (even) => {
      setEmail(even.target.value)
   }

   const handleNewPasswordChange = (even) => {
      setNewPass(even.target.value)
   }

   const handleNewPasswordConfirmChange = (even) => {
      setNewPassConfirm(even.target.value)
   }

   const steps = [
      {
         title: "Email",
         icon: <MailOutlined />,
         content: (
            <Form.Item
               name="email"
               rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email address!" }
               ]}
            >
               <Input placeholder="Email" size="large" onChange={handleEmailChange} />
            </Form.Item>
         ),
      },
      {
         title: "Confirm OTP",
         icon: <SignatureOutlined />,
         content: (
            <Form.Item
               name="otp"
               form={form}
               rules={[{ required: true, message: "Please input OTP!" }]}
            >
               <Input.OTP
                  size="large"
                  value={otp}
                  formatter={(str) => str.toUpperCase()}
                  onChange={onChange}
               />
            </Form.Item>
         ),
      },
      {
         title: "Reset Password",
         icon: <LockOutlined />,
         content: (
            <Row gutter={16}>
               <Col span={12}>
                  <Form.Item
                     name="newPass"
                     rules={[
                        { required: true, message: "Please input your new password!" },
                        { min: 8, message: "Password must be at least 8 and at most 16 characters long!" },
                     ]}
                  >
                     <Input.Password placeholder="Password" size="large" onChange={handleNewPasswordChange} />
                  </Form.Item>
               </Col>
               <Col span={12}>
                  <Form.Item
                     name="newPassConfirm"
                     rules={[
                        { required: true, message: "Please input password confirm!" },
                        { min: 8, max: 16, message: "Password must be at least 8 and at most 16 characters long!" },
                     ]}
                  >
                     <Input.Password placeholder="Password Confirm" size="large" onChange={handleNewPasswordConfirmChange} />
                  </Form.Item>
               </Col>
            </Row>
         )
      },
   ];

   const items = steps.map((item) => ({
      key: item.title,
      title: item.title,
      // icon: item.icon
   }));

   const goPrevStep = () => {
      setCurrent(current - 1)
      setOTP(null)
      setNewPass(null)
      setNewPassConfirm(null)
      form.resetFields(["otp", "newPass", "newPassConfirm"])
   }

   const handleGoNextStep = async () => {
      try {
         // Validate fields based on the current step
         await form.validateFields();

         message.loading({ content: 'Processing...', key: 'process' });
         let response
         switch (current) {
            case 0:
               response = await requestRecoverPassword({ email: email })
               break;
            case 1:
               response = await sendVerifyOTP({
                  email: email,
                  otp: otp
               })
               break
            case 2:
               if (newPass == newPassConfirm) {
                  response = await resetPassword({
                     email: email,
                     newPass: newPass
                  })
               }
               break
            default:
               break
         }
         if (!response.success) {
            message.error({ content: response.message, key: "process" })
         } else {
            message.success({ content: "OTP sent to your mail!", key: 'process', duration: 2 });
            if (current < steps.length - 1) {
               setCurrent(current + 1)
               setOTP(null)
               setNewPass(null)
               setNewPassConfirm(null)
               setCountDown(30)
               setResendDisabled(true)
               form.resetFields(["otp", "newPass", "newPassConfirm"])
            } else {
               navigate("/login")
            }
         }
      } catch (error) { }
   }

   const handleResendOTP = async () => {
      try {
         message.loading({ content: 'Processing...', key: 'process' });
         await requestRecoverPassword({ email: email })
         setResendDisabled(true)
         setCountDown(30)
         message.success({ content: "OTP sent to your mail!", key: "process", duration: 2 })
      } catch (error) {
         message.error('Failed to resend OTP')
      }
   }

   const handleGoBack = () => navigate(-1)

   return (
      <Flex
         align="center"
         vertical
         style={{ height: "100vh", paddingTop: 200 }}
      >
         <div
            className="p-6"
            style={{
               maxWidth: 800,
               width: "100%",
               border: "2px solid #ccc",
               // padding: "24px",
               borderRadius: "5px",
               backgroundColor: "#fff",
            }}
         >
            <Space direction="vertical" style={{ width: "100%" }}>
               <Row justify={"space-between"}>
                  <Button type="text" icon={<ArrowLeftOutlined />} onClick={handleGoBack}></Button>
                  <Title level={2} style={{ textAlign: "center" }}>
                     Recover Password
                  </Title>
                  <div></div>
               </Row>
               <Steps current={current} items={items} />
               <Form
                  form={form}
               >
                  <div
                     style={{
                        textAlign: "center",
                        color: token.colorTextTertiary,
                        backgroundColor: token.colorFillAlter,
                        marginTop: 16,
                        padding: 16,
                     }}
                  >
                     {steps[current].content}
                  </div>
               </Form>
               <div className="px-4">
                  <Row
                     justify={"space-between"}
                  >
                     <Col>
                        {current < steps.length - 1 && (
                           <Button type="primary" onClick={handleGoNextStep}>
                              Next
                           </Button>
                        )}
                        {current == steps.length - 1 && (
                           <Button type="primary" onClick={handleGoNextStep}>
                              Done
                           </Button>
                        )}
                        {current > 0 && (
                           <Button
                              className="mx-2"
                              onClick={goPrevStep}
                           >
                              Previous
                           </Button>
                        )}
                     </Col>
                     <Col>
                        {current == 1 && (
                           <Button type="link" disabled={resendDisabled} onClick={handleResendOTP}>
                              Resend OTP {resendDisabled && `(${countDown}s)`}
                           </Button>
                        )}
                     </Col>
                  </Row>
               </div>
            </Space>
         </div>
      </Flex>
   )
}