import fitz
import os

pdf_path = r'C:\Users\RAJUAN\.gemini\antigravity-ide\brain\bfc3be2e-a209-4667-a67c-0a6348c98231\.user_uploaded\media_1789454978564.pdf'
doc = fitz.open(pdf_path)
print('Pages in PDF:', len(doc))

out_dir = r'assets\profile-setup\reference'
os.makedirs(out_dir, exist_ok=True)

img_count = 0
for i, page in enumerate(doc):
    pix = page.get_pixmap(dpi=150)
    page_img_path = os.path.join(out_dir, f'page_{i+1}.png')
    pix.save(page_img_path)
    print(f'Saved page_{i+1}.png: {pix.width}x{pix.height}')

    for img_info in page.get_images():
        xref = img_info[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image['image']
        image_ext = base_image['ext']
        w = base_image['width']
        h = base_image['height']
        img_name = f'extracted_img_{i+1}_{xref}.{image_ext}'
        img_path = os.path.join(out_dir, img_name)
        with open(img_path, 'wb') as f:
            f.write(image_bytes)
        img_count += 1
        print(f'  Extracted image {img_name}: {w}x{h}')

print(f'Done! Rendered {len(doc)} pages, extracted {img_count} images.')
