#include "BitReader.h"

namespace SpaceMedia {
  BitReader::BitReader(shared_ptr<vector<shared_ptr<const uint8_t>>> data)
    : m_data {make_unique<vector<shared_ptr<const uint8_t>>>()}
    , m_position {0} 
  {
    append(data);
  }

  void BitReader::append(shared_ptr<vector<shared_ptr<const uint8_t>>> data)
  {
    for (auto &&item : *data)
    {
      m_data->push_back(item);
    }
  }
}