import os
from openai import OpenAI

client = OpenAI(
    base_url="https://api.featherless.ai/v1",
    api_key=os.getenv("FEATHERLESS_API_KEY")
)

response = client.chat.completions.create(
    model="Qwen/Qwen2.5-7B-Instruct",
    messages=[
        {
            "role": "system",
            "content": "You are a smart conflict resolver."
        },
        {
            "role": "user",
            "content": """
            Budget = 3000
            Wants luxury hotel
            Wants near airport
            Wants 5 star rating

            Resolve the conflicts and explain the final decision.
            """
        }
    ]
)

print(response.choices[0].message.content)