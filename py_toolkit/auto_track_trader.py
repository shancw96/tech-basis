import sys
import requests
import time
import os

from email_service import qq_email_send
os.environ["http_proxy"] = "http://127.0.0.1:10809"
os.environ["https_proxy"] = "http://127.0.0.1:10809"
os.environ["all_proxy"] = "socks5://127.0.0.1:10808"
headers = {
    "Authorization": "1aWQiOiJ0S1F2MUJVZ0NrYTJLMEFRZTM5end3PT0iLCJzdGEiOjAsIm1pZCI6InRLUXYxQlVnQ2thMkswQVFlMzl6d3c9PSIsImlhdCI6MTY4NTg3MDM1NSwiZXhwIjoxNjg2NDc1MTU1LCJiaWQiOjAsImRvbSI6Ind3dy5va3guY29tIiwiZWlkIjoxLCJpc3MiOiJva2NvaW4iLCJzdWIiOiIzNkJGMjFBNEQyNkE5RTJFN0MyNEVGRDBGNzc5QjNENiJ9.hFCpkkTEELk6AiuwH-8zO55tCoSipwnekPhj1SZ-QjaaUpQGU0fNlOLDyqNF6sB9psGFyJJ8pyek-pQdugp2vw"
}


traderUniqueNames = ["99AC4D8B37871816"] # china tiger





def try_to_follow(traderUniqueName):
    url = "https://www.okx.com/priapi/v5/ecotrade/copier/first-settings"
    
    payload_template = {
        "maxFollowAmount": "200000",
        "mgnMode": "cross",
        "tpRatio": "",
        "slRatio": "",
        "instruments": [{"instId": "BTC-USDT-SWAP"}, {"instId": "ETH-USDT-SWAP"}],
        "stopLossAmount": "",
        "remainMgnDeal": "1",
        "copyMode": "FIXED_COST",
        "followAmount": "20"
    }
   
    payload = payload_template.copy()
    payload["traderUniqueName"] = traderUniqueName
    timestamp = int(time.time() * 1000)
    params = {"t": str(timestamp)}
    response = requests.post(url=url, json=payload, headers=headers, params=params)
    print(f"Trader: {traderUniqueName}, Response: {response.json()}")
    return response.json()["code"] == "0"

def cancel_follow(traderUniqueName):
    cancel_follow_url="https://www.okx.com/priapi/v5/ecotrade/copier/cancel-follow"
    cancel_payload_template = {
    "remainMgnDeal":"2"
    }
    cancel_payload = cancel_payload_template.copy()
    cancel_payload['uniqueName'] = traderUniqueName
    timestamp = int(time.time() * 1000)
    params = {"t": str(timestamp)}
    response = requests.post(url=cancel_follow_url, json=cancel_payload, headers=headers, params=params)
    print(f'cancel follow', response)

def query_current_follow():
    current_follow_list="https://www.okx.com/priapi/v5/ecotrade/copier/trader-list"
    timestamp = int(time.time() * 1000)
    params = {"t": str(timestamp), "size": 10}
    response = requests.get(url=current_follow_list, headers=headers, params=params)
    nicknames = [obj['nickName'] for obj in response.json()['data']]
    return nicknames

nicknames = query_current_follow()
print(f'当前跟单：', nicknames)
while True:
  for traderUniqueName in traderUniqueNames:
      is_success = try_to_follow(traderUniqueName)
      if is_success:
          cancel_follow('0720E541F24DB8FC')
          nicknames = query_current_follow()
          qq_email_send("OKX 自动跟单锁定成功", ",".join(nicknames))
          sys.exit(0) # 响应成功，立即退出程序
  time.sleep(0.5)