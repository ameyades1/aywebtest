#!/usr/bin/env python3
"""
Sets up the AntarYog product catalog folder structure:
- Creates prod_NNN_<slug> folders for each product
- Downloads thumbnail images
- Writes updated product-catalog.json with URLs
"""

import json, os, subprocess, re

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Full product data: (json_id, url_slug, image_url)
# json_id matches existing product-catalog.json ids
PRODUCT_URLS = {
    1:  ("decoding-ganapati-atharvashirsha",
         "https://static-media.hotmart.com/4Zs0z_q_PNl_CtoclcsWZ2AT1TU=/705x0/https://uploads.teachablecdn.com/attachments/9df2f5a4450a4f64adc5dcbd9288977c.jpg"),
    2:  ("transform-your-life",
         "https://static-media.hotmart.com/3zNYQNT01bsUSxRRjnRFayoUC9g=/705x0/https://uploads.teachablecdn.com/attachments/ZZ5rgpzURuKqe2zU5HVg_Transform+Your+Life+-+Thumbnail.jpg"),
    3:  ("hansa-gita",
         "https://static-media.hotmart.com/EUYIpA5PR7RyAh9z0e5d4tXU0Mg=/705x0/https://uploads.teachablecdn.com/attachments/214a98de420042439ad81b6febaa5be7.jpg"),
    4:  ("discovering-the-guiding-light-within-you",
         "https://static-media.hotmart.com/RUtx5PpfZr5BCFRqJZ3Yk7WW2wI=/705x0/https://uploads.teachablecdn.com/attachments/3c4d572a49904eec954c92c5d7504b72.jpg"),
    5:  ("unlocking-the-real-route-to-lasting-success",
         "https://static-media.hotmart.com/EZEAHVxJrIMS6kgNsIeCHndstE8=/705x0/https://uploads.teachablecdn.com/attachments/dd7206150ae34b929f9fa4f932c0a863.jpg"),
    6:  ("how-to-recognise-your-ideal-guru",
         "https://static-media.hotmart.com/rcJLT8YFkXjcDxRVk_wnHyJlOF4=/705x0/https://uploads.teachablecdn.com/attachments/kW3qaQUgTm2GUiCNYBdA_How+to+Recognise+Your+Ideal+Guru.jpg"),
    7:  ("finding-purpose-of-your-life-success-blueprint",
         "https://static-media.hotmart.com/wp7IdTZK_Wy47fZP_s1rwBd8KWw=/705x0/https://uploads.teachablecdn.com/attachments/MnETqDjiREmmkXa47rOY_Finding+Purpose+of+Your+Life+-+Success+Blueprint+-+Thumbnail.jpg"),
    8:  ("fulfil-all-your-desires",
         "https://static-media.hotmart.com/HqINmfeM7I8qlFNrR-3PuHNLjwg=/705x0/https://uploads.teachablecdn.com/attachments/e695c67d8b794001bf359d1499fac380.jpg"),
    9:  ("your-duties-during-difficult-times",
         "https://static-media.hotmart.com/iE0qGzDjnabsxAwhyNmP43m9kS0=/705x0/https://uploads.teachablecdn.com/attachments/2545e38fb14b4170b9178d815283ce9b.jpg"),
    10: ("secret-to-ultimate-happiness",
         "https://static-media.hotmart.com/cqP0qEk2jyYKLrnj4uQ2qBzBMzM=/705x0/https://uploads.teachablecdn.com/attachments/3SsNPjhTyuwyeDnoH0Oj_secret+to+happiness.jpg"),
    11: ("aahar-diet-for-the-spiritual-seeker-advanced",
         "https://static-media.hotmart.com/xuyvf8wQ8QqELUhE3Hmzw9ELzGM=/705x0/https://uploads.teachablecdn.com/attachments/b4c7947fd3d146b3b9f88e9110522a2f.jpg"),
    12: ("the-true-meaning-of-yog",
         "https://static-media.hotmart.com/8yFMotYYDO0_bQQ-Y1FdjKytNak=/705x0/https://uploads.teachablecdn.com/attachments/YtVGI3y0QkipDijzXjl4_The+True+Meaning+of+Yog+-+Thumbnail.png"),
    13: ("removing-negativities-in-relationships",
         "https://static-media.hotmart.com/TWvPVETB5_4Y7LCu_dT4rIo8-gs=/705x0/https://uploads.teachablecdn.com/attachments/s1yol4YQp6pkpAl4M9lZ_Chanchula+Thumbnail.jpeg"),
    14: ("understanding-lord-shani-friend-or-enemy",
         "https://static-media.hotmart.com/2JmCfbBROjDzvONlOeMXu_e11b4=/705x0/https://uploads.teachablecdn.com/attachments/VUs0UjSvQfWbNvVay8Xj_Shani+Mahatmnya+Thumbnail.jpg"),
    15: ("wisdom-of-the-upanishads-discourses-07-12",
         "https://static-media.hotmart.com/1zuLGv2HyGz5D-ujt4kkUwNmyFM=/705x0/https://file-uploads.teachablecdn.com/0da0c8cdb4494bc79eb67d4b438f22a1/a01668cbb901465091bbfb5eb962f970"),
    16: ("daan-donation-your-key-to-ultimate-success-and-liberation-advanced-course",
         "https://static-media.hotmart.com/8ZBbFj0V7YHo4d5Wq63uC_1LRZI=/705x0/https://uploads.teachablecdn.com/attachments/vFx6wy83Tp2nQNCTZzwp_Daan+-+Advanced+Course+-+Thumbnail.jpg"),
    17: ("brahmacharya-decoding-celibacy-to-achieve-health-wealth-and-success-advanced-course",
         "https://static-media.hotmart.com/EFtYbx8orHTo2uMj1qHCrP95Vuc=/705x0/https://uploads.teachablecdn.com/attachments/KcHHDRuSOGxcK8cg4qKx_Brahmcharya+-+Advanced+Course.jpg"),
    18: ("the-blueprint-to-achieving-instant-results",
         "https://static-media.hotmart.com/WznBYRS9ajrWni4tQNRScZozMRo=/705x0/https://uploads.teachablecdn.com/attachments/lJhZH5hTSvmszOHVTlzj_The+Blueprint+to+Achieving+Instant+Results.png"),
    19: ("sri-sukta-chanting-with-bijama-tratmak-sadhana",
         "https://static-media.hotmart.com/DaNnKfs0St5cqAS5hHMVcAFeFik=/705x0/https://uploads.teachablecdn.com/attachments/E7CofhzBRFmHo93rFC83_Shri+Sukta+Chanting+with+Biamantramak+Sadhanaj.jpeg"),
    20: ("significance-of-the-divine-savitru-kaathak-chayan-maha-yadnya",
         "https://static-media.hotmart.com/V72jgieqXZ-5ks8Cg_YSY6R8BE4=/705x0/https://uploads.teachablecdn.com/attachments/awcy3BOqQfi8pVhgJkqI_Savitru+Kathak+Intro.jpg"),
    21: ("wisdom-of-the-upanishads-discourses-01-06",
         "https://static-media.hotmart.com/4REszKkQa-nvkO2QKvFm4jscTzo=/705x0/https://file-uploads.teachablecdn.com/bea5700a8a814670961acbdc26c8e7a1/b70b65220af44b3b9056debc4117fd1f"),
    22: ("guru-graha-sadhana",
         "https://static-media.hotmart.com/lqBd90bi6YHQcSbrG0EwfhbPO20=/705x0/https://uploads.teachablecdn.com/attachments/119dfc8dab4c4c91afc32689e3a60107.jpg"),
    23: ("mangal-sadhana",
         "https://static-media.hotmart.com/K1eJ0U9IQ04XbjXWzZz0Q5ENKik=/705x0/https://uploads.teachablecdn.com/attachments/cffe57825a724b7daa529e500cca35b9.jpg"),
    24: ("budh-sadhana",
         "https://static-media.hotmart.com/EPYgoCCsOTF_ZVZmGkLxAGV4Ybc=/705x0/https://uploads.teachablecdn.com/attachments/a3d26110ef0746f69c35dfa94350b638.jpg"),
    25: ("surya-sadhana",
         "https://static-media.hotmart.com/x09PQCnEy4dAlZTZknUW63Pr5Bs=/705x0/https://uploads.teachablecdn.com/attachments/a0de713aaf9f4c86b40200bc0bfde050.jpg"),
    26: ("chandra-sadhana",
         "https://static-media.hotmart.com/NV8PC4Li_j6zbmK7-HMCEouOguE=/705x0/https://uploads.teachablecdn.com/attachments/bcbcc9d972a64b8bb037812eb217f0a7.jpg"),
    27: ("gayatri-mool-mantra-sadhana-with-empowering-teachings",
         "https://static-media.hotmart.com/C_z3nKa0tpjRPUWLHIPytvodZ9U=/705x0/https://uploads.teachablecdn.com/attachments/94626982b8eb470198b7f1343bb5558d.jpeg"),
    28: ("vyapar-vruddhi-mool-mantra-sadhana",
         "https://static-media.hotmart.com/IwsiCPffR8mZZSSC7Wgtw29RHHs=/705x0/https://uploads.teachablecdn.com/attachments/yeSxatHMRWCK10UxbSGA_Shree+Chakra+Vyapar+Vruddhi+Mool+Mantra+Sadhana.jpg"),
    29: ("mahamrutyunjay-mool-mantra-sadhana",
         "https://static-media.hotmart.com/fBd1-bW8uNQEyLLwRkvI6yq7Obk=/705x0/https://file-uploads.teachablecdn.com/d50ce39ca3f7487db4260e53668689e1/ac38683b23cf4b27b15816bbddb16fff"),
    30: ("mahalakshmi-mool-mantra-sadhana",
         "https://static-media.hotmart.com/L23Z0wjYeRAvqvD5qoqptMgZ_vQ=/705x0/https://file-uploads.teachablecdn.com/1ad1ef526f5049e6af58c8eca79049e1/680291e3d67a4eec807c54da4a388c86"),
    31: ("shiva-shadakshar-mool-mantra-sadhana",
         "https://static-media.hotmart.com/wlClKpZPXbFJpCJ4Qd388U9ALig=/705x0/https://file-uploads.teachablecdn.com/40f2fe251fc44510a48b6be7435ee4e1/2deca235b43941608f7f107839ccf4ed"),
    32: ("karya-siddhi-ganapati-mool-mantra-sadhana",
         "https://static-media.hotmart.com/Yb-3xQ4YLPfcvwst1F4RmeAE8aQ=/705x0/https://file-uploads.teachablecdn.com/24a6bb8b4cce4ae08c6823ac4dfe73e1/12d567f0087e4397a478ecdcf2a64d5e"),
    33: ("saraswati-mool-mantra-sadhana",
         "https://static-media.hotmart.com/glyAcJJDD_DkNscKtfbnJKvWW_I=/705x0/https://file-uploads.teachablecdn.com/188573ac026a4cbeb7ed0add726344e1/e15aa247dfc744a6820f023c315e20ca"),
    34: ("dhanvantari-mool-mantra-sadhana",
         "https://static-media.hotmart.com/LM39joAJVvHBgSwXXu2Poi7mwMg=/705x0/https://file-uploads.teachablecdn.com/08c4fd584b094ab39cb5b214740986e1/de7d2aaa8fef4f5eaf78f14d3fdc36e6"),
    35: ("atma-moksha-shanti-mool-mantra-sadhana",
         "https://static-media.hotmart.com/70cqJsrbE3GMEHwvN-ECnyuhWeE=/705x0/https://file-uploads.teachablecdn.com/2672c4549c4d49f39f173afae056b4e1/168afd1f1e0f4fc3b028d6c4098256f9"),
    36: ("parashakti-ganapati-mool-mantra-sadhana",
         "https://static-media.hotmart.com/_MXUKRwtJMdjtZfFAInXzEnADnQ=/705x0/https://file-uploads.teachablecdn.com/c77e8938a5b34d1990b49f1d0591b7e1/d15f568d7ebe432e81bf07607abff001"),
    37: ("durga-mool-mantra-sadhana",
         "https://static-media.hotmart.com/7W2dqYgDGwsLeYZxRh_7xMkJvCw=/705x0/https://file-uploads.teachablecdn.com/05222ecd139c4556a4c0f0a6b61552a1/ab397fb6a809477d82f4eecbe0b200f6"),
    38: ("panchakshar-mool-mantra-sadhana",
         "https://static-media.hotmart.com/Ic9fiD3tA0GavnVZ0-gpD9lK4po=/705x0/https://file-uploads.teachablecdn.com/ff8b3a10250a4a5b864deb3b07410ba1/349f0169c38c44fa96a0613b56a75005"),
    39: ("jeev-moksha-shanti-mool-mantra-sadhana",
         "https://static-media.hotmart.com/AujF__Tffjj13KknbIr6gtCao7w=/705x0/https://file-uploads.teachablecdn.com/42dfd82c58744baa8d09b373258c46e1/112d17786ddd410199d782a72725224d"),
    40: ("dhan-akarshan-kuber-mool-mantra-sadhana",
         "https://static-media.hotmart.com/4F6nRkiwfQsKXOyimYYbmWOt5mQ=/705x0/https://file-uploads.teachablecdn.com/bfbb8b042f0647cdb43df8bc532572a1/405694c27cf54085a6068ee8b50bc954"),
    41: ("shatru-samhar-mool-mantra-sadhana",
         "https://static-media.hotmart.com/87tIK72cqovw_dg46h-5kvkxkso=/705x0/https://file-uploads.teachablecdn.com/f9c105b3c6344ebda9ca1809ce88f3a1/6cbd5ff06b414d1ebc94ef9bcc6bd2be"),
    42: ("sakal-kutumb-karya-siddhi-mool-mantra-sadhana",
         "https://static-media.hotmart.com/1NvFQWEkUiGMPJMkPpYp5vUb6aY=/705x0/https://uploads.teachablecdn.com/attachments/543db0ab968943ecb7988ee89d402eac.jpg"),
    43: ("dhanvantari-gayatri-karya-siddhi-mool-mantra-sadhana",
         "https://static-media.hotmart.com/hOfUvF2wxcNE3A51Oap3Dq0ZYSI=/705x0/https://file-uploads.teachablecdn.com/ad1ebb09c99d472f8107283a41fe10a1/acf02f6106aa40ea9fcd17364cbcffd5"),
    44: ("swayamvar-parvati-mool-mantra-sadhana-for-men",
         "https://static-media.hotmart.com/5Ffv5CVI1qY1e23StNZXVV4hLCo=/705x0/https://file-uploads.teachablecdn.com/1782fb8673774164b7d93d0286e41fa1/ffaabf5629054053969c798b47a882d2"),
    45: ("shiva-shakti-mool-mantra-sadhana",
         "https://static-media.hotmart.com/8OWsM5awwCgzzgx2_QdOMVl7vBE=/705x0/https://file-uploads.teachablecdn.com/99e96c5b3ebd4e309b8888572a42b0a1/8af42c4a21da4a0fab585aef18c69587"),
    46: ("lakshmi-kuber-mool-mantra-sadhana",
         "https://static-media.hotmart.com/w5D3awXLuWo8Ksg3yZD9Z0NUfI4=/705x0/https://file-uploads.teachablecdn.com/c91843f117474d8686b38d5b6aca09a1/a8ecf02cd8a7416bb886cfee87c286bd"),
    47: ("surya-gayatri-mool-mantra-sadhana",
         "https://static-media.hotmart.com/PO23on0aGV_7U7ccEyp6Rq38WHk=/705x0/https://file-uploads.teachablecdn.com/d374599ebcbf48f9841ff04b98f9cca1/e49e011b3db9434dbbf6a3daccb53508"),
    48: ("navagraha-mool-mantra-sadhana",
         "https://static-media.hotmart.com/beNu6h68wdoB_1LNdhLkedcGZY0=/705x0/https://file-uploads.teachablecdn.com/962331dbc52b4f5a98550c4cf2df0ca1/ff6e05566a34461cb296cc34a9fa580a"),
    49: ("ashta-lakshmi-mool-mantra-sadhana",
         "https://static-media.hotmart.com/q4qy9FeR_QpTve-fyD9wj-QoiKU=/705x0/https://file-uploads.teachablecdn.com/c8ecb5a6c1234b539e164ef2c86457a1/95763695df3448a0a28eac93a67b01e8"),
    50: ("saraswati-gayatri-mool-mantra-sadhana",
         "https://static-media.hotmart.com/A1QhUOikJdktdbSthIOg3_rIPso=/705x0/https://file-uploads.teachablecdn.com/b724ada9d3c34c649f1f6f0d51be10a1/abf747cf25804dccafe2d1b249852ac7"),
    51: ("lakshmi-narayan-mool-mantra-sadhana",
         "https://static-media.hotmart.com/jeutyIM0jpfUr2OOJlcYpEvw0Jk=/705x0/https://file-uploads.teachablecdn.com/46530e7f6bfa48fda8747734de3612a1/954da20c585f4cab8fb278486dfef9de"),
    52: ("antar-yog-om-chanting",
         "https://static-media.hotmart.com/DZgrkFjRukX42gnsQNHaGMT3MZ0=/705x0/https://uploads.teachablecdn.com/attachments/noNudZcjSjubLLrJe5Sd_Om_Chanting_THUMBNAIL.png"),
    53: ("antar-yog-guru-stuti",
         "https://static-media.hotmart.com/1hBZzUCxRjeittfY7nX08Bjnmf0=/705x0/https://uploads.teachablecdn.com/attachments/1UzEO2gySY6opnka4X5d_Guru_Stuti_1.jpg"),
    54: ("antar-yog-mahamrutyunjay-chanting",
         "https://static-media.hotmart.com/5iGhRsfMkYA_QhE_0aZRopLZx5E=/705x0/https://uploads.teachablecdn.com/attachments/jR4jab4sRbelZ2MLV9Rq_MahaMrityunjaya_Chanting.jpg"),
    55: ("antar-yog-chakra-cleansing-sadhana",
         "https://static-media.hotmart.com/wxhyYF_cc2OMdLRr6eHfkVYoZSU=/705x0/https://uploads.teachablecdn.com/attachments/cYHq5dQqQpmpewcJ2Gvj_CHAKRA+CLEANSING_THUMBNAIL.jpeg"),
    56: ("decoded-knowledge-of-maha-shivaratri-chants",
         "https://static-media.hotmart.com/u9_RKXlKKUjrIWGAdt1g6VglpiU=/705x0/https://file-uploads.teachablecdn.com/62f9108cb80a4ecb868a0f03ffee83a1/31ced3de343f4e50b18ef31591e98b54"),
}

BASE_URL = "https://learn.antaryogfoundation.in/p/"

def guess_ext(url, img_url):
    for ext in [".jpg", ".jpeg", ".png"]:
        if ext in img_url.lower():
            return ext
    return ".jpg"

# Load existing JSON
with open(os.path.join(BASE_DIR, "product-catalog.json")) as f:
    catalog = json.load(f)

# Update each product and create folders
for product in catalog["products"]:
    pid = product["id"]
    if pid not in PRODUCT_URLS:
        print(f"  WARNING: no URL data for id={pid}")
        continue

    slug, img_url = PRODUCT_URLS[pid]
    folder_name = f"prod_{pid:03d}_{slug}"
    folder_path = os.path.join(BASE_DIR, folder_name)

    # Update JSON fields
    product["url"] = BASE_URL + slug
    product["thumbnail_url"] = img_url
    product["folder"] = folder_name

    # Create product folder
    os.makedirs(folder_path, exist_ok=True)

    # Determine image filename
    ext = guess_ext(slug, img_url)
    img_path = os.path.join(folder_path, f"thumbnail{ext}")

    # Download thumbnail if not already present
    if not os.path.exists(img_path):
        print(f"  Downloading [{pid:03d}] {slug}{ext} ...")
        result = subprocess.run(
            ["curl", "-sL", "-o", img_path, img_url],
            capture_output=True
        )
        if result.returncode != 0:
            print(f"    ERROR: {result.stderr.decode()[:100]}")
        else:
            size = os.path.getsize(img_path)
            print(f"    OK ({size:,} bytes)")
    else:
        print(f"  [{pid:03d}] already exists, skipping download")

    # Store thumbnail filename in product record
    product["thumbnail_file"] = f"thumbnail{ext}"

# Write updated JSON
out_path = os.path.join(BASE_DIR, "product-catalog.json")
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(catalog, f, indent=2, ensure_ascii=False)

print(f"\nDone. Updated JSON saved to {out_path}")
print(f"Product folders created: {len(PRODUCT_URLS)}")
