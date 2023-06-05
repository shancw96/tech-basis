from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib

def qq_email_send(subject, content):
    msg_from = '792878578@qq.com'  # 发送方邮箱
    passwd = 'xxx'   #就是上面的授权码
    to= ['shancw1996@gmail.com'] #接收方邮箱
    
    # 设置邮件内容
    # MIMEMultipart类可以放任何内容
    msg = MIMEMultipart()
    # 把内容加进去
    msg.attach(MIMEText(content, 'plain', 'utf-8'))
    
    # 设置邮件主题
    msg['Subject'] = subject
    
    # 发送方信息
    msg['From'] = msg_from
    
    # 开始发送
    # 通过SSL方式发送，服务器地址和端口
    s = smtplib.SMTP_SSL("smtp.qq.com", 465)
    # 登录邮箱
    s.login(msg_from, passwd)
    # 开始发送
    s.sendmail(msg_from, to, msg.as_string())
    
    print(f'邮件"{subject}"发送成功！')
